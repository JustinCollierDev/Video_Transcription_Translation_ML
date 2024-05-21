const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/youtube', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'YouTube URL is required' });
        }

        const response = await axios.get(url.toString(), { responseType: 'arraybuffer' });
        res.send(response.data);
    } catch (error) {
        console.error('Error proxying YouTube request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server listening on port ${PORT}`);
});
