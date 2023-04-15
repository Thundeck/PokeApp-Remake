import React, {useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {filterType,orderPokemonsAsc,orderPokemonsDes ,orderAttackDes,orderAttackAsc, getAllPokemons} from '../../redux/actions'

function Filters({setCurrentPage}) {

    const dispatch = useDispatch()

    const allPokemonsRedux = useSelector(state => state.allPokemons)
    const allPokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.allTypes)

    const [filter, setFilter] = useState(true)

    const handleTypeFilter = (e) =>{
        dispatch(filterType(e.target.value, allPokemonsRedux))
        setCurrentPage(1)
        }
      
    const handleDefault = () =>{
    setCurrentPage(1)
    dispatch(getAllPokemons())
    }
    const handleOrder = (e) =>{
        if(e.target.value === "az") dispatch(orderPokemonsAsc())
        if(e.target.value === "za") dispatch(orderPokemonsDes())
        setCurrentPage(1)
        }
    
    const handleAttack = (e) =>{
    if(e.target.value === "az") dispatch(orderAttackAsc())
    if(e.target.value === "za") dispatch(orderAttackDes())
    setCurrentPage(1)
    }
    
  return (
    <div className='flex justify-end items-center flex-col'>
      <section className={`${filter ? "hidden" : "flex"} justify-center items-end flex-row gap-16`} >
        <div >

          <p className='text-white font-bold text-lg' >Types</p>
          <select
          style={{
            "-moz-appearance": "none",
             "text-indent": "0.01px",
             "text-overflow": '',
            "-webkit-appearance":"none",
            "-ms-appearance":"none",
            "-o-appearance":"none",
             "appearance":"none",
            }}
          className='w-36 h-7 rounded-lg bg-red-500 text-white font-bold capitalize tracking-wide -ms'
          onChange={(e) => handleTypeFilter(e)}>
            <option className='bg-red-500 text-white text-center font-semibold capitalize'  value='all'>all</option>
            {types?.map(e =>{
              return <option className='bg-red-500 text-white text-center font-semibold capitalize'   key={e._id} value={e.name}>{e.name}</option>
            })}
          </select>
        </div>

        <div>
          <p className='text-white font-bold text-lg' >Alphabetical</p>
          <select 
          style={{
            "-moz-appearance": "none",
             "text-indent": "0.01px",
             "text-overflow": '',
            "-webkit-appearance":"none",
            "-ms-appearance":"none",
            "-o-appearance":"none",
             "appearance":"none",
            }}
          className='w-36 h-7 rounded-lg bg-red-500 text-white font-bold capitalize tracking-wide open:rounded-full'
          onChange={(e) => handleOrder(e)}>
            <option className='bg-red-500 text-white text-center font-semibold capitalize' >-</option>
            <option className='bg-red-500 text-white text-center font-semibold capitalize'  value='az' >A-Z</option>
            <option className='bg-red-500 text-white text-center font-semibold capitalize'  value='za'>Z-A</option>
          </select>
        </div>

        <div >
          <p className='text-white font-bold text-lg' >by Attack</p>
          <select 
          style={{
            "-moz-appearance": "none",
             "text-indent": "0.01px",
             "text-overflow": '',
            "-webkit-appearance":"none",
            "-ms-appearance":"none",
            "-o-appearance":"none",
             "appearance":"none",
            }}
          className='w-36 h-7 rounded-lg bg-red-500 text-white font-bold capitalize tracking-wide open:rounded-full'
          onChange={(e) => handleAttack(e)}>
            <option className='bg-red-500 text-white text-center font-semibold capitalize' >-</option>
            <option className='bg-red-500 text-white text-center font-semibold capitalize'   value='az' >Attk asc</option>
            <option className='bg-red-500 text-white text-center font-semibold capitalize'   value='za'  >Attk des</option>
          </select>
        </div>

        {allPokemons !== allPokemonsRedux && <button className=' bg-red-500 h-11 rounded-md px-4 text-white font-bold' onClick={handleDefault} >delete filters</button>}

      </section>
      <button onClick={()=>setFilter(!filter)} className='text-white text-2xl'>{filter ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-up"></i>}</button>
    </div>
  )
}

export default Filters