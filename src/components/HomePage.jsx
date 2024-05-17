import React, {useState, useEffect, useRef} from 'react'

// Home page for QuickScript
export default function HomePage(props) {

  const {setAudioStream, setAudioFile} = props

  // Variables for handling a recording state
  const [recordingStatus, setRecordingState] = useState('inactive')
  const [audioChunks, setAudioChunks] = useState([])
  const [duraction, setDuration] = useState(0)

  const mediaRecorder = useRef(null)
  const mimeType = 'audio/webm'

  // Function: Handles when the user clicks the 'recording' button to create their own audio input.
  async function startRecording() {
      let tempStream
      console.log('Start recording')

      // Getting access to the user's microphone or input device.
      try {
          const streamData = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false
          })
          tempStream = streamData

      // Catch errors if thrown.
      } catch (err) {
          console.log(err.message)
          return
      }

      // Change the current recording status to active.
      setRecordingStatus('recording')

      // Recording media chunks from the active input device
      const media = new MediaRecorder(tempStream, { type: mimeType })
      mediaRecorder.current = media

      // Begin recording the audio
      mediaRecorder.current.start()
      let localAudioChunks = []

      mediaRecorder.current.ondataavailable = (event) => {
          if (typeof event.data === 'undefined') { return } // Audio data cannot be read
          if (event.data.size === 0) { return }             // Audio data is empty (size=0)

          // Recording in-progress
          localAudioChunks.push(event.data)
      }
      // Begin recording audio
      setAudioChunks(localAudioChunks)
  }

  // Function: Handles when the user has finished recording and wishes to save their audio for transcription.
  async function stopRecording() {

      // Set status to inactive
      setRecordingStatus('inactive')
      console.log('Stop recording')

      // Stop the acvtive recorder.
      mediaRecorder.current.stop()
      mediaRecorder.current.onstop = () => {

          // Create an audioBlob instance with our recorded audioChunks
          const audioBlob = new Blob(audioChunks, { type: mimeType })
          setAudioStream(audioBlob) // Set the stream to our Blob
          setAudioChunks([])
          setDuration(0)
      }
  }

  // Function: Counts the duration of an active recording
  useEffect(() => {
      if (recordingStatus === 'inactive') { return }

      // Set the interval at which we count.
      const interval = setInterval(() => {
          setDuration(curr => curr + 1)
      }, 1000) // 1000ms == 1 second

      return () => clearInterval(interval)
  })

  // Main Form
  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20'>
        
        <h1 className='font-semibold text-5xl sm:text-6l md:text-7xl'>Quick<span className='text-red-300 bold'>Script</span></h1>
    
        <h3 className='font-medium md:text-lg'>Upload <span className='text-red-300'> <i className="fa-solid fa-upload"></i></span>
            <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Transcribe <span className='text-red-300'> <i className="fa-solid fa-pen-nib"> </i> </span> <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Translate <span className='text-red-300'> <i className="fa-solid fa-earth-americas"></i></span>
        </h3>

        <label className='text-blue cursor-pointer hover:text-red-300 duration-200'>
            Upload File <i className="fa-solid fa-upload"></i>

            <input onChange={(e) =>{
              const tempFile = e.target.files[0]
                setAudioFile(tempFile)
            }} className='hidden' type='file' accept='.mp3,.wave,.mp4'/>
        </label>
        
        <p className='text-base my-4'> Or </p>

        <button className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full'>
          <p className='font-sm text-red-300 text-center'>Record your voice</p>
          <div className='flex items-center gap-2'>
            <i className="fa-solid fa-microphone"></i>
          </div>
        </button>

        <p className='italic text-slate-500'>Currently supporting <span className='text-red-300'>[ .mp4, .mp3, .wav ]</span></p>

        <br/><br/><br/><br/><br/>
        

    </main>
  )
} 
