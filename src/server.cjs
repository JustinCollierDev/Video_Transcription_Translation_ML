const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const stream = require('stream');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/convert', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).send('No URL provided');
    }

    try {
        const videoStream = ytdl(videoUrl, { filter: 'audioonly' });

        // Create a writable stream to collect the ffmpeg output
        const audioStream = new stream.Writable();
        const audioData = [];

        audioStream._write = (chunk, encoding, next) => {
            audioData.push(chunk);
            next();
        };

        audioStream.on('finish', () => {
            // Convert the collected audio data array to a Buffer
            const audioBuffer = Buffer.concat(audioData);

            // Set response headers
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.length
            });

            // Send the audio Buffer as the response
            res.end(audioBuffer);
        });

        // Pipe the video stream through ffmpeg to the audio stream
        videoStream.pipe(ffmpeg().format('mp3')).pipe(audioStream);

    } catch (error) {
        res.status(500).send(`Error converting video: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
