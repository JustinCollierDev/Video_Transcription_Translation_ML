import React, { useState } from 'react';
import axios from 'axios';

const YouTubeToMp3: React.FC = () => {
    const [url, setUrl] = useState('');
    const [mp3Url, setMp3Url] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleConvert = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/convert', {
                params: {
                    url: url
                }
            });
            setMp3Url(response.data.mp3Url);
        } catch (error) {
            console.error('Error converting video:', error);
            alert('Failed to convert video. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>YouTube to MP3 Converter</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL"
            />
            <button onClick={handleConvert} disabled={loading}>Convert</button>

            {loading && <p>Converting...</p>}

            {mp3Url && (
                <div>
                    <p>MP3 URL:</p>
                    <a href={mp3Url} download="converted.mp3">Download MP3</a>
                </div>
            )}
        </div>
    );
};

export default YouTubeToMp3;
