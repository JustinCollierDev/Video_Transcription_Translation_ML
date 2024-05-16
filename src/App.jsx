// Author: Justin Collier
// Date Created: 5/16/2024
// Purpose: This is a web-deployed application that takes Video and Audio files of multiple formats
//          and transcribes the speech-based audio into a raw-text transcript.
//

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col p-4'>
      <section className='min-h-screen flex flex-col'>
        <header>
          <h1>
          AI <span className='text-blue-400'>Text Transcriber</span>
          </h1>

          <main className='flex-1'>



          </main>
        </header>
      </section>

      <footer>

      </footer>
    </div>
  )
}

export default App
