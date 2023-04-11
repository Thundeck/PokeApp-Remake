import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createPokemon,getAllTypes} from '../../redux/actions'

let defaultForm = {
  sprites:'',
  name:'',
  health:'',
  attack:'',
  defense:'',
  speed:'',
  height:'',
  weight:'',
  types:[]
}

function Create() {

  
  const dispatch = useDispatch()
  
  useEffect(() =>{
    dispatch(getAllTypes())
  }, [dispatch])

  const types = useSelector(state => state.allTypes)


  const [form, setForm] = useState(defaultForm)
  const [typeClose, setTypeClose] = useState(false)
  const [error, setError] = useState({
    name:true,
    health:true,
    attack:true,
    defense:true,
    speed:true,
    height:true,
    weight:true,
    types:true
  })

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleButton = (e) =>{
    e.preventDefault()
    if(form.types.length < 2){
      setForm({
        ...form,
        types: [...form.types, e.target.name]
      })}
    }

    const handleDelete = (e) =>{
      e.preventDefault()
      let deleted = form.types.filter(t => t !== e.target.name)
      setForm({
        ...form,
        types: deleted
      })
    }

  



  const hanldeSubmit = (e) =>{
    e.preventDefault()
     dispatch(createPokemon(form))
    setForm(defaultForm)
  }

  return (
    <div className='flex justify-center items-center flex-row w-full h-full'>
        <form className='flex justify-center items-center flex-col p-4 bg-white shadow-lg shadow-black'>
            
            <div className='flex justify-center items-center flex-col'>
                <div className='flex justify-center items-center flex-col' >
                    <label>Pokemon's name</label>
                    <input
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Ditto...'
                    />
                </div>
                <div className='relative flex justify-center items-center flex-col w-40' >
                    <label onClick={()=>setTypeClose(!typeClose)}>Types{typeClose?<i className="fa-solid fa-caret-right"></i>:<i className="fa-solid fa-caret-down"></i>}</label>
                    <div className=' flex justify-center items-center flex-row h-12 w-36 rounded-md bg-slate-200 shadow-inner shadow-gray-500 '>
                        { form?.types?.map((e,i) =>{
                            return <button name={e} key={i} onClick={handleDelete} type='button' className='shadow-md bg-white shadow-gray-800 px-1 rounded text-red-500 font-bold hover:shadow-md hover:shadow-red-600 hover:scale-105 active:shadow-inner active:shadow-gray-800' >{e}</button>
                        })}
                    </div>
                    <div className={` ${!typeClose ? "hidden" : ""} absolute top-0 -right-64 bg-white rounded-md shadow-md shadow-gray-700 z-50 py-6 flex justify-center items-center flex-row flex-wrap w-64 gap-1`}>
                        {types?.map(e => (
                            <button name={e?.name} key={e.id} onClick={handleButton} type='button' className='shadow-md  shadow-gray-800 px-1 rounded bg-red-500 text-white font-bold hover:shadow-md hover:shadow-red-600 hover:scale-105 active:shadow-inner active:shadow-gray-800' >{e.name}</button>
                        ))}
                    </div>
                </div>
            </div>


            <div className='flex justify-center items-center flex-col' >
                <label>Pokemon's name</label>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Ditto...'
                />
            </div>
            <div className='flex justify-center items-center flex-col' >
                <label>Pokemon's name</label>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Ditto...'
                />
            </div>
            <div className='flex justify-center items-center flex-col' >
                <label>Pokemon's name</label>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Ditto...'
                />
            </div>
            <div className='flex justify-center items-center flex-col' >
                <label>Pokemon's name</label>
                <input
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Ditto...'
                />
            </div>
            <button type='submit'>Create</button>
        </form>
        <div className='flex justify-center items-center flex-col-reverse' >

        </div>

    </div>
  )
}

export default Create