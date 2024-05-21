import React, { useState } from 'react';
import axios from 'axios';


const port = 3001;

const YouTubeToMp3: React.FC = () => {
    const [url, setUrl] = useState('');
    const [mp3Data, setMp3Data] = useState<Blob | null>(null);

    const handleConvert = async () => {
        try {
            console.log("Attempting to get localhost")
            /*
            const response = await axios.get('http://localhost:3001/convert', {
                params: { url },
                responseType: 'blob',
            });
            */
            const response = axios.get('https://youtu.be/wDchsz8nmbo', {
                headers: {
                  'Access-Control-Allow-Origin': '*'
                }
              })
            .then(function (response) {
              console.log(response.data);
              console.log("Attempting to set MP3 data")
            setMp3Data(response.data);
            });

            //console.log("Attempting to set MP3 data")
            //setMp3Data(response.data);
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