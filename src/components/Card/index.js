import React, {useState} from 'react'
import Types from '../types.module.css'
import { Link } from 'react-router-dom'

function Card({name,img,types,to}) {

  const [shiny, setShiny] = useState(false) 

  return (
    <div  className={`${Types[types[0].name]} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-700 shadow-md relative hover:scale-105 duration-75 overflow-hidden`}>
      <button onClick={() => setShiny(!shiny)} className={`${shiny ? "text-yellow-300" : "text-gray-500"} z-50 absolute top-4 right-4 bg-white rounded-full font-bold p-3`}><i className="fa-solid fa-star"></i></button>
      <Link to={to} >
      <div className='bg-white rounded-full h-fit w-fit'>
        <img className='h-64 w-64 hover:scale-125 duration-75' src={!shiny ? img[0] : img[1]} alt={name}/>
      </div>
        </Link>
      <div className='flex justify-center items-center bg-red-600 w-full h-10' >
          <h2 className='text-white text-xl font-extrabold capitalize'>{name}</h2>
      </div>
      <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
        { types?.map((e,index) => {
          return <div key={index} className={`${Types.pkmtype} ${Types[e.name]}`}><span>{e.name}</span></div>
        })}
      </div>
    </div>
  )
}

export default Card