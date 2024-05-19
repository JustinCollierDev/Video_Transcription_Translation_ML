import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
    
    // Constants
    const { output, finished } = props
    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select language')
    const [translating, setTranslating] = useState(null)
    console.log(output)

    const worker = useRef()

    function handleCopy() {
        navigator.clipboard.writeText(output.transcription)

    }

    function handleDownload() {
        const element = document.createElement('a')
        const file = new Blob([], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download(`QuickScript_${(new Date()).toDateString()}.txt`)
        document.body.appendChild(element)
        element.click()

    }

    function generateTranslation()
    {

    }

    const textElement = tab === 'transcription' ? output.map(val => val.text) : ''


    return (
        <main className='flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20  mx-auto'>

            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-red-300 bold'>Transcription</span></h1>
           
            <div className='grid grid-cols-2 sm:mx-auto bg-white  rounded overflow-hidden items-center p-1 redShadow border-[2px] border-solid border-red-300'>
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-red-300 text-white' : ' text-red-900 hover:text-red-100')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-red-300 text-white' : ' text-red-900 hover:text-red-100')}>Translation</button>
            </div>

            <div className='my-8 flex flex-col'> 
            {tab === 'transcription' ? 
                (<Transcription {...props} textElement={textElement}/>) : 
                (<Translation {...props} toLanguage={toLanguage} translating={translating} translation={translation} 
                    setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage}/>)
            }
            </div>

            <div className='flex items-center gap-4 mx-auto text-base'>
                <button title="Copy" className='specialButton hover:text-red-900 duration-200 text-red-300 bold p-2 rounded px-4 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-copy"></i>
                </button>

                <button title="Download" className='specialButton hover:text-red-900 duration-200 text-red-300 bold p-2 rounded px-4 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-download"></i>
                </button>

            </div>

        </main>
    )
}