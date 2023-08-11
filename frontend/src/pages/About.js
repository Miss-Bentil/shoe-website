import React from 'react'
import { useSelector } from 'react-redux'


function About() {
  const data = useSelector(state => state.product)
  console.log(data)
  return (

    <div>
      {data.map(item => console.log(item.name))}

    </div>
  )
}

export default About
