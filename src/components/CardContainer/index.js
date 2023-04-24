import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card'
import Paginado from "../Paginado"
import Spinner from '../spinner'

const CardContainer = ({currentPokemons, pokemonsPerPage,paginado, setCurrentPage,currentPage}) => {

  const pokemons = useSelector(state => state.pokemons)
  const loader = useSelector(state => state.loader)

  return (
    <div className='mt-4 p-4 h-full w-full'>
      <Paginado allPokes={pokemons.length} pokemonsPerPage={pokemonsPerPage} paginado={paginado} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <div className='flex mt-4 gap-5 h-full justify-center items-center flex-row flex-wrap'>
        {
          !loader ? currentPokemons?.map(e => (
            <Card
            key={e._id} 
            to={`/${e._id}`}
            name={e?.name}
            img={e?.sprites}
            types={e?.types} />)) : <div><Spinner/></div>
        }
      </div> 
    </div>
  )
}

export default CardContainer