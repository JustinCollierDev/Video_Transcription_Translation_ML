import React from 'react'

export default function HomePage() {
  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20'>
        
        <h1 className='font-semibold text-5xl sm:text-6l md:text-7xl'>Quick<span className='text-blue-400 bold'>Script</span></h1>
    
        <h3 className='font-medium md:text-lg'>Upload <span className='text-blue-400'> <i class="fa-solid fa-upload"></i></span>
            <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Transcribe <span className='text-blue-400'> <i class="fa-solid fa-pen-nib"> </i> </span> <span className='font-medium md:text-lg'> &rarr;</span>
            {" "}Translate <span className='text-blue-400'> <i class="fa-solid fa-earth-americas"></i></span>
        </h3>

        <label className='text-blue cursor-pointer hover:text-blue-400 duration-200'>
            Upload <i class="fa-solid fa-upload"></i>
            <input className='hidden' type='file' accept='.mp3, .wave, .mp4'/>
        </label>
        
        <p className='text-base my-4'> Or </p>

        <button className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full'>
          <p className='font-sm text-blue-400 text-center'>Record your voice</p>
          <div className='flex items-center gap-2'>
            <i class="fa-solid fa-microphone"></i>
          </div>
        </button>

        <p className='italic text-slate-500'>Currently supporting <span className='text-blue-400'>[ .mp4, .mp3, .wav ]</span></p>

        <br/><br/><br/><br/><br/>
        

    </main>
  )
} 
