import { useEffect, useRef } from "react";

export default function AudioPlayer(props: {
    audioUrl: string;
    mimeType: string;
}) {
    const audioPlayer = useRef<HTMLAudioElement>(null);

    // Updates src when url changes
    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.src = props.audioUrl;
        }
    }, [props.audioUrl]);

    // Error handling
    const handleError = () => {
        console.error("Failed to load audio:", audioPlayer.current?.error);
    };

    return (
        <div className='flex relative z-10 p-4 w-full'>
            <audio
                ref={audioPlayer}
                controls
                className='w-full h-14 rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10'
                onError={handleError}
            >
                {/* Optionally, you can add <source> here if needed */}
            </audio>
        </div>
    );
}
