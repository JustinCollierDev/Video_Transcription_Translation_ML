/* eslint-disable camelcase */
import { pipeline, env } from "@xenova/transformers";

// Disable local models
env.allowLocalModels = false;

// Define model factories
// Ensures only one model is created of each type
class PipelineFactory {
    static task = null;
    static model = null;
    static quantized = null;
    static instance = null;

    constructor(tokenizer, model, quantized) {
        this.tokenizer = tokenizer;
        this.model = model;
        this.quantized = quantized;
    }

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            try {
                this.instance = await pipeline(this.task, this.model, {
                    quantized: this.quantized,
                    progress_callback,
                    revision: this.model.includes("/whisper-medium") ? "no_attentions" : "main"
                });
            } catch (error) {
                console.error("Error loading pipeline instance:", error);
                throw error;
            }
        }

        return this.instance;
    }
}

self.addEventListener("message", async (event) => {
    const message = event.data;

    try {
        let transcript = await transcribe(
            message.audio,
            message.model,
            message.multilingual,
            message.quantized,
            message.subtask,
            message.language,
        );

        if (transcript === null) return;

        // Send the result back to the main thread
        self.postMessage({
            status: "complete",
            task: "automatic-speech-recognition",
            data: transcript,
        });
    } catch (error) {
        self.postMessage({
            status: "error",
            task: "automatic-speech-recognition",
            data: error.message,
        });
    }
});

class AutomaticSpeechRecognitionPipelineFactory extends PipelineFactory {
    static task = "automatic-speech-recognition";
    static model = null;
    static quantized = null;
}

const transcribe = async (
    audio,
    model,
    multilingual,
    quantized,
    subtask,
    language,
) => {

    const isDistilWhisper = model.startsWith("distil-whisper/");

    let modelName = model;
    if (!isDistilWhisper && !multilingual) {
        modelName += ".en"
    }

    const p = AutomaticSpeechRecognitionPipelineFactory;
    if (p.model !== modelName || p.quantized !== quantized) {
        // Invalidate model if different
        p.model = modelName;
        p.quantized = quantized;

        if (p.instance !== null) {
            (await p.getInstance()).dispose();
            p.instance = null;
        }
    }

    try {
        // Load transcriber model
        let transcriber = await p.getInstance((data) => {
            self.postMessage(data);
        });

        const time_precision =
            transcriber.processor.feature_extractor.config.chunk_length /
            transcriber.model.config.max_source_positions;

        let chunks_to_process = [
            {
                tokens: [],
                finalised: false,
            },
        ];

        function chunk_callback(chunk) {
            let last = chunks_to_process[chunks_to_process.length - 1];

            Object.assign(last, chunk);
            last.finalised = true;

            if (!chunk.is_last) {
                chunks_to_process.push({
                    tokens: [],
                    finalised: false,
                });
            }
        }

        function callback_function(item) {
            let last = chunks_to_process[chunks_to_process.length - 1];
            last.tokens = [...item[0].output_token_ids];

            let data = transcriber.tokenizer._decode_asr(chunks_to_process, {
                time_precision: time_precision,
                return_timestamps: true,
                force_full_sequences: false,
            });

            self.postMessage({
                status: "update",
                task: "automatic-speech-recognition",
                data: data,
            });
        }

        let output = await transcriber(audio, {
            top_k: 0,
            do_sample: false,
            chunk_length_s: isDistilWhisper ? 20 : 30,
            stride_length_s: isDistilWhisper ? 3 : 5,
            language: language,
            task: subtask,
            return_timestamps: true,
            force_full_sequences: false,
            callback_function: callback_function,
            chunk_callback: chunk_callback,
        });

        return output;
    } catch (error) {
        console.error("Error during transcription:", error);
        throw error;
    }
};
