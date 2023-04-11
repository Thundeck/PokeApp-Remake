import React from 'react'

const Landing = ({setLanding}) => {
  return (
    <div>
        <button onClick={() => setLanding(false)} >pasar</button>
    </div>
  )
}

export default Landing