import React from 'react'
import ufo from "./ufo.png"
import { Link } from 'react-router-dom'
import r from '../../Routes'

const NotFound = () => {
  return (
    <div className='flex p-4 mt-20 flex-row justify-center items-center'>
        <div className='flex gap-8 flex-col justify-center items-center'>
            <p className='font-extrabold text-8xl'>
                Error 404</p>
            <p className='font-bold text-5xl'>
                how did you get here?</p>
            <Link to={r.main} className='text-center bg-black text-white font-bold text-2xl p-5 w-60 duration-150 hover:text-black hover:bg-white' >
            To home</Link>
        </div>
        <img className='h-80' alt='not found' src={ufo} />
    </div>
  )
}

export default NotFound