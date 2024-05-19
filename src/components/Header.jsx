import React from 'react'

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
        <h1 className='font-medium'>
        Quick<span className='text-red-300'>Script</span>
        </h1> 

        {/* Using an anchor tag for our '+' button to mimic starting a new transcription AKA just refreshing the page */}
        <a href="/" className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-red-300'>
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
        </a>
    </header>
  )
}