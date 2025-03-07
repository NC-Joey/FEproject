import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <div className='page404 d-flex flex-column gap-5 justify-content-center align-items-center text-center'>
        <div className='page404-block'>
          <h1>404</h1>
          <p><span className='animate-fade'>Page</span> Not Found</p>
        </div>
        <Link to={"/"} className='text-decoration-none fs-4'>Home</Link>
      </div>
    </>
  )
}

export default PageNotFound
