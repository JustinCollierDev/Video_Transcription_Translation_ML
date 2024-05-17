// Author: Justin Collier
// Date Created: 5/16/2024
// Purpose: This is a web-deployed application that takes Video and Audio files of multiple formats
//          and transcribes the speech-based audio into a raw-text transcript.
//

// General Imports
import { useState, useRef, useEffect } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'

// ML Model Imports
import {MessageTypes} from './utils/presets.js'

function App() {
  const [count, setCount] = useState(0)
  
  /* Constants for provided file OR recording*/
  const [file, setAudioFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const isAudioAvailable = file || audioStream

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {type: 'module'})
      }

      const onMessageReceived = async (e) => {
        switch (e.data.type) {
          case 'Downloading':
          setDownloading(true)
          console.log("Downloading...")
          break;

          case 'Loading':
          setLoading(true)
          console.log("Loading...")
          break;

          case 'Result':
          setOutput(e.data.results)
          console.log("Result...")
          break;

          case 'Inference_Done':
          setFinished(true)
          console.log("Inferencing Done.")
          break;
        }
      }

      worker.current.addEventListener('message', onMessageReceived)

      return () => worker.current.removeEventListener('message', onMessageReceived)
    })


  // Function: Gets the audio buffer from the file or transcription
  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    // Get out audio source
    let audio = await readAudioFrom(file ? file : audioStream)
    // This is the ML model we are using for transcription.
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type:MessageTypes.Inference_Request,
      audio,
      model_name
    })
  }

  function handleAudioReset() {
    setAudioFile(null)
    setAudioStream(null)
  }

  useEffect(() => {
    console.log(audioStream)
  }), [audioStream]


  return (
    <div className='flex flex-col max-w-[1920px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        
        {/* Our Header and Main tags are held within these two .jsx files that we function call*/}
        <Header />
        {output ? (<Information/>) : 
        loading ? (<Transcribing/>) : 
        isAudioAvailable ? (<FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream}/>) : 
        (<HomePage setAudioFile={setAudioFile} setAudioStream={setAudioStream}/>)}

      </section>

      <Footer />
    </div>
  )
}

export default App
