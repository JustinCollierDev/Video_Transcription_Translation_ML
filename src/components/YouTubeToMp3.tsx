import React, { useState } from 'react';
import axios from 'axios';

const YouTubeToMp3: React.FC = () => {
    const [url, setUrl] = useState('');
    const [mp3Data, setMp3Data] = useState<Blob | null>(null);

    const handleConvert = async () => {
        try {
            const response = await axios.get('http://localhost:3000/youtube', {
                params: { url },
                responseType: 'blob',
            });
            setMp3Data(response.data);
        } catch (error) {
            console.error('Error converting video:', error);
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
            <button onClick={handleConvert}>Convert</button>

            {mp3Data && (
                <audio controls>
                    <source src={URL.createObjectURL(mp3Data)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default YouTubeToMp3;
