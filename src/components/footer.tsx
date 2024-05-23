import React, { memo } from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';

const Footer = memo(() => {
  return (
    <MDBFooter className='bg-dark text-center text-white'>

      <div>
      <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='https://justincollier.netlify.app'
            target="_blank"
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='https://www.linkedin.com/in/justincollier3d/'
            target="_blank" 
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='https://github.com/JustinCollierDev'
            target="_blank"
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>
      </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(1, 0, 0, 0.2)' }}>
      

        Justin Collier - Personal Portfolio Project - 2024

        <div>
        Made with{" "}
                  <a
                      className='underline'
                      href='https://github.com/xenova/transformers.js'
                  >
                      🤗 Transformers.js
                  </a>
      </div>

      </div>
      
    </MDBFooter>
  )
})

export default Footer