import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDetails,deleteDetail} from '../redux/actions'
import Types from './types.module.css'
import { useParams } from 'react-router-dom'

function PokemonDetails() {
  const idPoke = useParams().id
  
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getDetails(idPoke))
  },[dispatch, idPoke])

  const {name,types,sprites,attack,defense,health,height,speed,weight} = useSelector(state => state.detail)

  const [num, setNum] = useState(0)

  useEffect(() =>{
    return () => dispatch(deleteDetail())
  },[dispatch])

  return (
    <div className='flex justify-center items-center py-10 flex-col lg:flex-row gap-10 lg:gap-24'>
      
      <div className='flex justify-center items-center flex-col gap-5 w-80 h-full' >
          <div className={`${types && Types[types[0].name]} flex justify-center items-center flex-row w-80 rounded-2xl shadow-gray-700 shadow-md relative`}>
            {sprites?.length > 1 && <button className={` ${(num === 0) ? "hidden":""} absolute top-1/3 left-1 bg-gray-400 opacity-80 rounded-lg hover:bg-gray-300 duration-150 hover:scale-110 h-28 w-10 hover:text-red-600 text-white`} onClick={() => setNum(0)} ><i className="fa-solid text-3xl  fa-caret-left "></i></button>}
            <img alt={name} className='h-80' src={sprites && sprites[num]}/>
            {sprites?.length > 1 && <button className={`${(num === 1) ? "hidden":""} absolute top-1/3 right-1 bg-gray-400 opacity-80 rounded-lg hover:bg-gray-300 duration-150 hover:scale-110 h-28 w-10 hover:text-red-600 text-white `} onClick={() => setNum(1)}><i className="fa-solid text-3xl  fa-caret-right "></i></button>}
          </div>

          <div className='bg-zinc-700  rounded-md h-14 w-full flex justify-center items-center shadow-md shadow-gray-700'>
            <p className='text-white text-2xl capitalize font-bold tracking-widest ' >{name}</p>
          </div>
      </div>

      <div className='flex- justify-center items-center flex-col bg-zinc-700 px-10 py-5 rounded-2xl gap-5 shadow-md shadow-gray-700'>
        <div className='flex justify-center items-center flex-col w-64 lg:w-80'>
          <p className="text-white text-lg font-extrabold tracking-widest " >Stats</p>
          <div className='flex justify-center items-center flex-col gap-3 p-4 '>
                  
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Health</p>
                  <p style={{
                    width:`${health}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-red-500 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Attack</p>
                  <p style={{
                    width:`${attack}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-orange-400 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Defense</p>
                  <p style={{
                    width:`${defense}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-yellow-400 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                  
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Speed</p>
                  <p style={{
                    width:`${speed}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-pink-400 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Height</p>
                  <p style={{
                    width:`${height}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-blue-400 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                  <div className=" h-8 w-64 lg:w-80 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Weight</p>
                  <p style={{
                    width:`${weight}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-green-400 z-40 absolute h-8 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-64 lg:w-80 h-8' ></p>
                  </div>
                
            </div>
        </div>
        <div className='flex justify-center items-center flex-col' >
              <p className="text-white text-lg font-extrabold tracking-widest " >Types</p>
              <div className=' flex justify-center items-center flex-row gap-4' >
              { types?.map((e,index) => {return(
              <div key={index} className={`${Types.pkmtype} ${Types[e.name]}`} >
                <span>{e.name}</span>
                </div>)})}
              </div>
            </div>
      </div>
    </div>
  )
}

export default PokemonDetails