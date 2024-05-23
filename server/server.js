import express from 'express';
import cors from 'cors';
import Zencoder from 'zencoder';

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Initialize Zencoder client with your API key
const client = new Zencoder('414b2d85f6fd0dfea3d3c1227ba0af9d');

app.get('/convert', async (req, res) => {
    console.log('GET request received');
    const videoUrl = req.query.url;
    console.log('Video URL:', videoUrl);
    if (!videoUrl) {
        console.log('No URL provided');
        return res.status(400).send('No URL provided');
    }

    try {
        // Create a Zencoder job
        client.Job.create({
            input: videoUrl,
            outputs: [
                { label: 'mp3', format: 'mp3', audio_bitrate: 128 }
            ]
        }, (err, data) => {
            if (err) {
                console.error('Error creating Zencoder job:', err);
                res.status(500).send('Error converting video');
            } else {
                console.log('Zencoder job created successfully:', data);

                // Redirect to the transcoded MP3 URL
                const mp3Url = data.outputs[0].url;
                res.redirect(mp3Url);
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
