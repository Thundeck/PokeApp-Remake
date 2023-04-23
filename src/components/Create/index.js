import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createPokemon,getAllTypes} from '../../redux/actions'
import Types from '../types.module.css'
import img from '../../img/defaultImg.png'
import Alert from '../Alert'

const defaultForm = {
  sprites:[],
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
  const [skills, setSkills] = useState({
    health:'0',
    attack:'0',
    defense:'0',
    speed:'0',
    height:'0',
    weight:'0',
  })
  const [typeClose, setTypeClose] = useState(false)
  const [alert, setAlert] = useState({msg:"",error:false})

  const handleChange = (e) =>{

    if(skills[e.target.name]){setSkills({
      ...skills,
      [e.target.name]: ((e.target.value*100)/225).toString()
    })}



    if(!isNaN(Number(e.target.value)) && Number(e.target.value) < 1 ){
      setForm({
        ...form,
        [e.target.name]: 1
      })
    } else if (!isNaN(Number(e.target.value)) && Number(e.target.value) > 225 ){
      setForm({
        ...form,
        [e.target.name]: 225
      })
    } else {
      
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleButton = (e) =>{
    e.preventDefault()
    if(form.types.length < 2 && !form.types.includes(e.target.name)){
      setForm({
        ...form,
        types: [...form.types, e.target.name]
      })
      return
    }
    setAlert({error:true, msg:"can only contain two types and these cannot be repeated."})
    setTimeout(() => setAlert({error:false, msg:""}),"5000")
    }

    const handleDelete = (e) =>{
      e.preventDefault()
      const deleted = form.types.filter(t => t !== e.target.name)
      setForm({
        ...form,
        types: deleted
      })
    }

    const handleDeleteImage = (e) =>{
      e.preventDefault()
      const deleted = form.sprites.filter(t => t !== e.target.value)
      setForm({
        ...form,
        sprites: deleted
      })
    }

    const handleImage = (e) => {
      const file = e.target.files[0];
      if (!(["jpeg","jpg","png"].includes(file?.type?.split("/")[1]))){

        setAlert({error:true,msg:"only images in jpeg, jpg or png format are allowed."})
        setTimeout(() => setAlert({error:false,msg:""}),"5000")
        return
    }
      previewFile(file)
    }

    const previewFile = (file) =>{
      const reader = new FileReader()
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if(form.sprites.length <= 1){

          setForm({
            ...form,
            sprites:[...form.sprites, reader.result]})
          }else{
            setForm({
              ...form,
              sprites:[reader.result,form.sprites[0]]})
          }
        }
      }

  const hanldeSubmit = (e) =>{
    e.preventDefault()

    if (Object.values(form).includes('')) {
      setAlert({ msg: "All fields are required", error: true });
      setTimeout(() => setAlert({error:false, msg:""}),"5000")
      return
    }

    if (form.types.length === 0) {
      setAlert({ msg: "at least one type is required", error: true });
      setTimeout(() => setAlert({error:false, msg:""}),"5000")
      return
    }

    if (form.sprites.length === 0) {
      setAlert({ msg: "at least one image is required", error: true });
      setTimeout(() => setAlert({error:false, msg:""}),"5000")
      return
    }

    if( !form.name.match(/^([a-zÀ-ÿ]+[\s-]?){2}[a-z]+?[0-9]?/i) || form.name.length < 3 || form.name.length > 30 ) {
      setAlert({msg:"the name must be between 3 and 30 characters, one or two words, numbers and accents are allowed",
      error:true})
      setTimeout(() => setAlert({error:false, msg:""}),"5000")
    return
    }

     dispatch(createPokemon(form))
    setForm(defaultForm)
  }

  return (
    <div className='flex justify-center items-center lg:items-start flex-col lg:flex-row w-full h-full py-12 gap-12 relative'>
        {alert.error && <Alert msg={alert.msg}/>}

        <form onSubmit={(e) => hanldeSubmit(e)} className='flex justify-center items-center flex-col p-6 rounded-lg bg-gray-100 gap-4 shadow-lg shadow-gray-800 w-80 lg:w-fit'>
            <div className={"flex justify-center items-start flex-col lg:flex-row gap-10"}>

              <div className='flex justify-center items-center flex-col gap-4'>
                <label className='text-red-600 font-semibold capitalize text-lg border-b-2 border-red-600 mb-1'>Pokemon Characteristics</label>
                  <div className='flex justify-center items-center flex-col' >
                      <input
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='Pokemon name'
                      className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                      />
                  </div>
                  <div className='relative flex justify-center items-center flex-col w-40' >
                      <label className='text-lg hover:cursor-pointer text-red-600 font-semibold' onClick={()=>setTypeClose(!typeClose)}>Types  {typeClose?<i className="fa-solid fa-caret-right text-2xl text-red-500"></i>:<i className="fa-solid fa-caret-down hover:cursor-pointer text-2xl text-red-500"></i>}</label>
                      <div className=' flex justify-center items-center flex-row h-12 w-36 rounded-md bg-slate-200 shadow-inner shadow-gray-800'>
                          { form?.types?.map((e,i) =>{
                              return <button name={e} key={i} onClick={handleDelete} type='button' className='shadow-md bg-white shadow-gray-800 px-1 rounded text-red-500 font-bold hover:shadow-md hover:shadow-red-600 hover:scale-105 active:shadow-inner active:shadow-gray-800' >{e}</button>
                            })}
                      </div>
                      <div className={` ${!typeClose ? "hidden" : ""} absolute top-24 lg:top-0 -right-13  lg:-right-64 bg-white rounded-md shadow-md shadow-gray-800 z-50 py-6 flex justify-center items-center flex-row flex-wrap w-64 gap-1`}>
                        <p className='w-full text-center font-bold text-red-600 text-lg'>Choose one or two types</p>
                          {types?.map(e => (
                            <button name={e?.name} key={e._id} onClick={handleButton} type='button' className='shadow-md  shadow-gray-800 px-1 rounded bg-red-500 text-white font-bold hover:shadow-md hover:shadow-red-600 hover:scale-105 active:shadow-inner active:shadow-gray-800' >{e.name}</button>
                            ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full h-fit">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-f border-2 border-red-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
                        <div className={`${form.sprites.length ? "pt-24" : ""} flex flex-col relative items-center justify-center pt-5 pb-6`}>
                            {!form.sprites.length ?<svg aria-hidden="true" className="w-10 h-10 mb-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            :<div className='absolute top-1 -left-10 z-50 flex justify-center items-center gap-2 flex-row w-40'>
                            {(form.sprites.length > 0) && form.sprites.map((e,i) => (
                              <div key={i} className='relative bg-white p-2 shadow-md overflow-hidden rounded-lg shadow-black h-20 w-20'>
                                <img className=' h-16 w-20' src={e} alt={form.name || "no name"} />
                                <button value={e} onClick={handleDeleteImage} className='absolute top-0 right-0 rounded-bl-lg text-white bg-red-500 w-5 h-5 flex justify-center items-center'>x</button>
                              </div>
                            ))}
                            </div>}
                            <p className="font-semibold mb-2 text-sm text-red-600 ">Click to upload</p>
                            <p className="mb-2 text-sm text-red-600 ">or drag and drop</p>
                            <p className="text-xs text-red-600 ">PNG, JPEG or JPG </p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={handleImage} className="hidden" />
                    </label>
                </div>
              </div>

              <div className='relative flex justify-center items-center flex-col gap-6  w-40' >
                  <label className='text-red-600 font-semibold capitalize text-lg border-b-2 border-red-600 mb-1' >Pokemon Stats</label>
                    <div className='flex justify-center items-center flex-col' >
                    <input
                      name='health'
                      type='number'
                      min={1}
                      max={225}
                      className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                      value={form.health}
                      onChange={handleChange}
                      placeholder='Health...'
                      />
                </div>

                <div className='flex justify-center items-center flex-col' >
                  <input
                    name='attack'
                    type='number'
                    min={1}
                    max={225}
                    className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                    value={form.attack}
                    onChange={handleChange}
                    placeholder='Attack...'
                    />
                </div>
                <div className='flex justify-center items-center flex-col' >
                  <input
                    name='defense'
                    type='number'
                    min={1}
                    max={225}
                    className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                    value={form.defense}
                    onChange={handleChange}
                    placeholder='Defense...'
                    />
                </div>
                <div className='flex justify-center items-center flex-col' >
                  <input
                    name='speed'
                    type='number'
                    min={1}
                    max={225}
                    className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                    value={form.speed}
                    onChange={handleChange}
                    placeholder='Speed...'
                    />
                </div>
                <div className='flex justify-center items-center flex-col' >
                  <input
                    name='height'
                    type='number'
                    min={1}
                    max={225}
                    className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                    value={form.height}
                    onChange={handleChange}
                    placeholder='Height...'
                    />
                </div>
                <div className='flex justify-center items-center flex-col' >
                  <input
                    name='weight'
                    type='number'
                    min={1}
                    max={225}
                    className='bg-transparent border-b-2 border-red-300 pl-2 w-40' 
                    value={form.weight}
                    onChange={handleChange}
                    placeholder='Weight...'
                    />
                </div>
              </div>
            </div>

            <button className='bg-red-600 text-white tracking-widest w-full text-md font-bold text py-2 rounded-lg' type='submit'>CREATE</button>
        </form>
        <div className='flex justify-center items-center flex-col gap-5' >
          <div  className={` ${Types[form.types[0]] || "bg-zinc-700"} flex justify-end items-center flex-col rounded-2xl h-96 w-72 shadow-gray-800 shadow-lg relative hover:scale-105 duration-75 overflow-hidden`}>
            <div className='bg-white rounded-full h-fit w-fit'>
              <img className='h-64 w-64 hover:scale-125 duration-75' src={form.sprites[0] || img} alt={form.name}/>
            </div>
            <div className='flex justify-center items-center bg-red-600 w-full h-10' >
                <h2 className='text-white text-xl font-extrabold capitalize'>{form.name || "Name"}</h2>
            </div>
            <div className='bg-zinc-700 w-full flex justify-center items-center py-1 gap-3' >
              { form.types.length ? form.types.map((e,index) => {
                return <div key={index} className={`${Types.pkmtype} ${Types[e]}`}><span>{e}</span></div>
              })
              :
               ["normal"].map((e,index) => {
                return <div key={index} className={`${Types.pkmtype} ${Types[e]}`}><span>{e}</span></div>
              })
              }
            </div>
          </div>

          <div className='flex justify-center items-center flex-col lg:flex-row gap-3 bg-zinc-700 p-4 rounded-xl shadow-lg shadow-gray-800'>
            <section className='flex justify-center items-center flex-col gap-1' >
                  
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Health</p>
                  <p style={{
                    width:`${skills.health}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-red-500 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Attack</p>
                  <p style={{
                    width:`${skills.attack}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-orange-400 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Defense</p>
                  <p style={{
                    width:`${skills.defense}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-yellow-400 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                
              </section>
              <section className='flex justify-center items-center flex-col gap-1' >
                  
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Speed</p>
                  <p style={{
                    width:`${skills.speed}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-pink-400 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Height</p>
                  <p style={{
                    width:`${skills.height}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-blue-400 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                  <div className=" h-6 w-72 lg:w-52 overflow-hidden rounded-sm relative flex justify-center items-center" >
                    <p  className='text-white tracking-widest font-bold z-50 absolute'  >Weight</p>
                  <p style={{
                    width:`${skills.weight}%`,
                    transition:"width 0.5s"
                  }} className='top-0 left-0 bg-green-400 z-40 absolute h-6 ' ></p>
                  <p  className='top-0 left-0 absolute bg-gray-400 w-72 lg:w-52 h-6' ></p>
                  </div>
                
              </section>
            </div>
        </div>

    </div>
  )
}

export default Create