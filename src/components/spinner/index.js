import React from 'react'
import Types from '../types.module.css'
import pikachu from "../../img/pikachu-shadow.jpg"

const Spinner = () => {
  return (
    <div className='flex mt-4 gap-5 h-full justify-center items-center flex-row flex-wrap'>

      <div  className={`${Types.unknown} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-700 shadow-md relative overflow-hidden animate-pulse`}>
        <div className='bg-white rounded-full h-fit w-fit mb-5'>
          <img className='h-64 w-64 rounded-full ' src={pikachu} alt="spinnerCard"/>
        </div>
        <div className='flex justify-center items-center bg-red-600 w-full h-10' >
            <h2 className='text-white text-xl font-extrabold capitalize'>loading...</h2>
        </div>
        <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
        </div>
      </div>

      <div  className={`${Types.unknown} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-700 shadow-md relative overflow-hidden animate-pulse`}>
        <div className='bg-white rounded-full h-fit w-fit mb-5'>
          <img className='h-64 w-64 rounded-full ' src={pikachu} alt="spinnerCard"/>
        </div>
        <div className='flex justify-center items-center bg-red-600 w-full h-10' >
            <h2 className='text-white text-xl font-extrabold capitalize'>loading...</h2>
        </div>
        <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
        </div>
      </div>

      <div  className={`${Types.unknown} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-700 shadow-md relative overflow-hidden animate-pulse`}>
        <div className='bg-white rounded-full h-fit w-fit mb-5'>
          <img className='h-64 w-64 rounded-full ' src={pikachu} alt="spinnerCard"/>
        </div>
        <div className='flex justify-center items-center bg-red-600 w-full h-10' >
            <h2 className='text-white text-xl font-extrabold capitalize'>loading...</h2>
        </div>
        <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
        </div>
      </div>
      <div  className={`${Types.unknown} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-700 shadow-md relative overflow-hidden animate-pulse`}>
        <div className='bg-white rounded-full h-fit w-fit mb-5'>
          <img className='h-64 w-64 rounded-full ' src={pikachu} alt="spinnerCard"/>
        </div>

        <div className='flex justify-center items-center bg-red-600 w-full h-10' >
            <h2 className='text-white text-xl font-extrabold capitalize'>loading...</h2>
        </div>
        <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
            <div className={`${Types.pkmtype} ${Types.unknown}`}><span>???</span></div>
        </div>
      </div>

    </div>
  )
}

export default Spinner