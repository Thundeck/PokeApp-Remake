import React from 'react'
import { Link } from 'react-router-dom'
import r from "../../Routes"

const About = () => {
  return (
    <div className='flex flex-col gap-16 h-screen justify-center items-center'><h1 className=' text-5xl text-center md:text-8xl font-extrabold'>Working in progress</h1>
            <Link to={r.main} className='text-center bg-black text-white font-bold text-x md:text-2xl p-5 w-60 duration-150 hover:text-black hover:bg-white' >
            To home</Link>
    </div>
    
  )
}

export default About