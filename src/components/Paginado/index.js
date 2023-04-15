import React, {useState} from 'react'

const Paginado = ({allPokes, pokemonsPerPage, paginado, setCurrentPage,currentPage}) => {

    const pageNumbers = []

    for(let i=1 ; i <= Math.ceil(allPokes/pokemonsPerPage); i++){
      pageNumbers.push(i)
    }

let obj = pageNumbers?.reduce( (prev, act) =>{
  if(!prev[act]){
    if(act === 1) {
      prev[act] = true
    } else {
    prev[act]=false
    }
  }
  return prev
},{})

let auxState = pageNumbers?.reduce( (prev, act) =>{
  if(!prev[act]){
    prev[act]=false
  }
  return prev
},{})

const [select, setSelect] = useState({...obj, 1:true})

const handleClick = (e) =>{
  paginado(e)
  setSelect({
    ...auxState,
    [e]:true

  })

}


const handlePage = (e) => {
  if(Number(e.target.value) < pageNumbers.length+1 && Number(e.target.value) > 0 ) {
    setCurrentPage(Number(e.target.value))
    setSelect({
      ...auxState,
      [e.target.value]:true  
    })
  }
}

  return (
    <nav className='w-full flex justify-center items-center flex-row gap-2' >
      <button className='text-red-500 bg-white text-xl shadow-md active:shadow-inner active:shadow-zinc-600 shadow-zinc-600 rounded px-2' value={currentPage - 1} onClick={(e) => handlePage(e)}>Prev</button>
        {pageNumbers && pageNumbers.map(e => {
            return (
                <button className={`${select[e] ? "bg-red-500 text-white shadow-md shadow-gray-700" : "bg-transparent"} w-7 h-7 rounded-md font-semibold`} name={e} key={e} type='text' onClick={() => handleClick(e)}>{e}</button>
            )
          })}
      <button className='text-red-500 bg-white text-xl shadow-md active:shadow-inner active:shadow-zinc-600 shadow-zinc-600 rounded px-2' value={currentPage + 1} onClick={(e) => handlePage(e)}>Next</button>
    </nav>
  )
}

export default Paginado