import React from 'react'
import s from './Alert.module.css'

const Alert = ({msg}) => {
  return (
    <div className={`${s.vanish} flex justify-center items-start flex-col absolute top-3 w-80 lg:w-96 h-fit bg-white shadow-md shadow-gray-800 z-50 rounded-xl overflow-hidden`}>
    <h2 className={`pl-4 tracking-widest text-white bg-red-600 w-full font-bold text-xl  `}>Alert!</h2>
    <p className='pl-4 text-center text-gray-500 font-semibold' >{msg}</p>
  </div>
  )
}

export default Alert