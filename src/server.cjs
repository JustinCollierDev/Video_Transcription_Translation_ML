const express = require('express');
const ytdl = require('ytdl-core');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/convert', async (req, res) => {
    console.log('GET request received');
    const videoUrl = req.query.url;
    console.log('Video URL:', videoUrl);
    if (!videoUrl) {
        console.log('No URL provided');
        return res.status(400).send('No URL provided');
    }

    try {
        // Spawn FFmpeg process
        const ffmpegProcess = spawn('ffmpeg', [
            '-i', 'pipe:0',         // Input from stdin
            '-f', 'mp3',            // Output format
            'pipe:1',               // Output to stdout
        ]);

        // Set response headers
        res.set({
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked',
        });

        // Pipe video stream to FFmpeg stdin and FFmpeg stdout to response stream
        ytdl(videoUrl, { filter: 'audioonly' }).pipe(ffmpegProcess.stdin);
        ffmpegProcess.stdout.pipe(res);

        // Handle FFmpeg process errors
        ffmpegProcess.stderr.on('data', (data) => {
            console.error(`FFmpeg stderr: ${data}`);
        });

        ffmpegProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`FFmpeg process exited with code ${code}`);
                res.status(500).send('Error converting video');
            } else {
                console.log('Conversion completed successfully');
            }
        });

    } catch (error) {
        console.error('Error converting video:', error);
        res.status(500).send(`Error converting video: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
