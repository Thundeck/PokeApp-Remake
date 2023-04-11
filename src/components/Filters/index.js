import React, {useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {getAllPokemons,filterType,orderPokemonsAsc,orderPokemonsDes ,orderAttackDes,orderAttackAsc} from '../../redux/actions'

function Filters({setCurrentPage}) {

    const dispatch = useDispatch()

    const allPokemonsRedux = useSelector(state => state.allPokemons)
    const allPokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.allTypes)

    const [filter, setFilter] = useState(true)

    console.log(filter)

    const handleTypeFilter = (e) =>{
        dispatch(filterType(e.target.value, allPokemonsRedux))
        setCurrentPage(1)
        }
      
    const handleClick = () =>{
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
          className='w-36 h-7 rounded-lg'
          onChange={(e) => handleTypeFilter(e)}>
            <option value='all'>all</option>
            {types?.map(e =>{
              return <option  key={e.id} value={e.name}>{e.name}</option>
            })}
          </select>
        </div>

        <div>
          <p className='text-white font-bold text-lg' >Alphabetical</p>
          <select 
          className='w-36 h-7 rounded-lg'
          onChange={(e) => handleOrder(e)}>
            <option>-</option>
            <option value='az' >A-Z</option>
            <option value='za'>Z-A</option>
          </select>
        </div>

        <div >
          <p className='text-white font-bold text-lg' >by Attack</p>
          <select 
          className='w-36 h-7 rounded-lg'
          onChange={(e) => handleAttack(e)}>
            <option>-</option>
            <option  value='az' >Attk asc</option>
            <option  value='za'  >Attk des</option>
          </select>
        </div>

        {allPokemons !== allPokemonsRedux && <button className=' bg-red-500 h-11 rounded-md px-4 text-white font-bold' onClick={handleClick} >delete filters</button>}

      </section>
      <button onClick={()=>setFilter(!filter)} className='text-white text-2xl'>{filter ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-up"></i>}</button>
    </div>
  )
}

export default Filters