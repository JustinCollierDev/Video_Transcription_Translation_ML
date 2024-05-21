import { AudioManager } from "./components/AudioManager";
import Transcript from "./components/Transcript";
import { useTranscriber } from "./hooks/useTranscriber";

import Header from './components/header'
import Footer from './components/footer'

function App() {
    const transcriber = useTranscriber();

    return (
        <div>
        <Header />

            <div className='container flex flex-col justify-center items-center'>
            
            <h1 className='font-semibold text-5xl sm:text-6l md:text-7xl'>Quick<span className='text-red-300 bold'>Script</span></h1>

            <h3 className='font-medium md:text-lg'>Upload <span className='text-red-300'> <i className="fa-solid fa-upload"></i></span>
            <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Transcribe <span className='text-red-300'> <i className="fa-solid fa-pen-nib"> </i> </span> <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Download <span className='text-red-300'> <i className="fa-solid fa-file-arrow-down"></i></span>
            </h3>

            <h3 className='font-small md:text-sm'> Create fast and easy subtitles for your videos</h3>
            <br/>

                <AudioManager transcriber={transcriber} />
                <Transcript transcribedData={transcriber.output} />
                
            </div>

            
            <Footer />
        </div>
    );
}

export default App;
