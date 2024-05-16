// Author: Justin Collier
// Date Created: 5/16/2024
// Purpose: This is a web-deployed application that takes Video and Audio files of multiple formats
//          and transcribes the speech-based audio into a raw-text transcript.
//

import { useState } from 'react'
import HomePage from './components/HomePage'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        
        {/* Our Header and Main tags are held within these two .jsx files that we function call*/}
        <Header />
        <HomePage />

      </section>

      <footer>

      </footer>
    </div>
  )
}

export default App
