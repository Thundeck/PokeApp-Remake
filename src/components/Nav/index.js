import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import r from '../../Routes'
import { useDispatch } from 'react-redux'
import Pokemon from '../../img/pokemonlogo.png';
import Filters from '../Filters';
import { getPokemon } from '../../redux/actions';
import Alert from '../Alert';

const Nav = ({setCurrentPage}) => {

  const [search, setSearch] = useState("")
  const [close, setClose] = useState(true)
  const [alert, setAlert] = useState({msg:"",error:false})
  const path = useLocation().pathname

  const dispatch = useDispatch()

  const handleClick = () =>{
    dispatch(getPokemon(search.trim().toLocaleLowerCase(),setAlert))
    setTimeout(() => setAlert({msg:"",error:false}),"5000")
    setSearch("")
  }

  return (
    <div className='flex justify-center items-center flex-col h-fit w-full bg-red-600 shadow-md shadow-gray-700'>
      {alert.error && <Alert msg={alert.msg}/>}

      <div className='flex justify-center items-center flex-col h-fit py-2 lg:flex-row w-full bg-red-600 gap-4'>
        <div className='flex px-6 lg:px-16 lg:pr-0 justify-between items-center w-full'>
          <Link to={r.main} ><img className="h-12 " alt='PokeApp' src={Pokemon} /></Link>
          <button onClick={() => setClose(!close)} className='lg:hidden text-white text-2xl' ><i className="fa-solid fa-bars"></i></button>
        </div>

      <div className={` ${close ? "hidden" : ""}  lg:pr-16 lg:flex justify-center items-center flex-col h-fit lg:flex-row w-full bg-red-600 gap-5`}>
        
        {!(path === "/about") && <Link onClick={() => setClose(true)} className='flex justify-center items-center h-14 lg:h-full w-full lg:w-28 font-extrabold text-lg text-white active:text-red-800 lg:hover:scale-105
        ' to={r.about} >About</Link>}

        {!(path === "/create") && <Link onClick={() => setClose(true)} className='flex justify-center items-center h-14 lg:h-full w-full lg:w-28 font-extrabold text-lg text-white active:text-red-800 lg:hover:scale-105
        ' to={r.create} >Create</Link>}

          {!(path !== "/") && <div className=' mt-4 lg:mt-0 mb-4 lg:mb-0 flex flex-row items-center justify-center'>
            <input
            value={search}
            placeholder='Rayquaza...'
            className='h-11 lg:w-60 pl-4 bg-gray-200 rounded-l-lg'
            type='text'
            onChange={e => setSearch(e.target.value)}
            />
            <button onClick={handleClick} className='bg-red-500 lg:w-40 text-base font-semibold h-11 text-white px-4 hover:bg-gray-200 hover:text-red-600 duration-200 rounded-r-lg'>Search</button>
          </div>}
        </div>
      </div>
      <Filters setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Nav