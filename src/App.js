import CardContainer from './components/CardContainer';
import CreatePokemon from './components/Create';
import PokemonDetails from './components/PokemonDetails';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import {Route, Routes} from 'react-router-dom'
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons,getAllTypes} from "./redux/actions"
import About from './components/About'

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllPokemons())
    dispatch(getAllTypes())
  },[dispatch])

  const pokemons = useSelector(state => state.pokemons)
  
  const [currentPage, setCurrentPage] = useState(1)
  const pokemonsPerPage = 12
  const indexLastPokemon = currentPage * pokemonsPerPage // 12 > 24
  const indexFirstPokemon = indexLastPokemon - pokemonsPerPage // 12
  const currentPokemons = pokemons?.slice(indexFirstPokemon, indexLastPokemon)

  const paginado  = (numPage)=>{
    setCurrentPage(numPage)
  }


  return (
    <div >
      <div>
        <Nav setCurrentPage={setCurrentPage}/>
        <Routes>
          <Route exact path='/' element={<CardContainer currentPokemons={currentPokemons} pokemonsPerPage={pokemonsPerPage} paginado={paginado} setCurrentPage={setCurrentPage} currentPage={currentPage}/>}/>
          <Route exact path='/create' element={<CreatePokemon/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/:id' element={<PokemonDetails/>}/>
          <Route element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
