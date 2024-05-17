// Author: Justin Collier
// Date Created: 5/16/2024
// Purpose: This is a web-deployed application that takes Video and Audio files of multiple formats
//          and transcribes the speech-based audio into a raw-text transcript.
//

import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import FileDisplay from './components/FileDisplay'

function App() {
  const [count, setCount] = useState(0)
  
  /* Constants for provided file OR recording*/
  const [file, setAudioFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const isAudioAvailable = file || audioStream

  function handleAudioReset() {
    setAudioFile(null)
    setAudioStream()
  }null

  return (
    <div className='flex flex-col max-w-[1920px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        
        {/* Our Header and Main tags are held within these two .jsx files that we function call*/}
        <Header />
        
        {isAudioAvailable ? (<FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream}/>) : (<HomePage setAudioFile={setAudioFile} setAudioStream={setAudioStream}/>)}

      </section>

      <Footer />
    </div>
  )
}

export default App
