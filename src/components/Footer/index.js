import React from 'react'

const Footer = () => {

  const year = Date().split(" ")[3]

  return (
    <div className=' absolute bottom-0 w-full bg-black bg-opacity-60 h-fit lg:h-14 flex flex-col lg:flex-row py-4 lg:py-10  gap-2 lg:gap-5 justify-between items-center mt-10 px-5' >
        <p className='text-white text-base text-center'>
        designed and developed by Brian Leguizamon
        </p>
        <p className='text-white text-base'>
        Copyright © Thundeck {year}
        </p>
        <div className='flex justify-center items-center flex-row gap-4'>
            <a href='https://github.com/Thundeck' target='_blank' rel="noreferrer" className={`flex p-2 rounded-full bg-white text-gray-900 text-xl lg:text-3xl`}><i className="fa-brands fa-github"></i></a>
            <a href='https://www.linkedin.com/in/thundeck/' target='_blank' rel="noreferrer" className={`flex p-2 rounded-full bg-white text-gray-900 text-xl lg:text-3xl`}><i className="fa-brands fa-linkedin-in"></i></a>
            <a href='mailto:thundeckk@gmail.com' target='_blank' rel="noreferrer" className={`flex p-2 rounded-full bg-white text-gray-900 text-xl lg:text-3xl`}><i className="fa-regular fa-envelope"></i></a>
          </div>
    </div>
  )
}

export default Footer