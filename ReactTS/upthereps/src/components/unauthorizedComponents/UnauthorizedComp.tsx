import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnauthorizedComp = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  return (
    <section className='flex flex-col justify-center items-center h-full w-full'>
      <h1 className='uppercase underline'>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <button onClick={goBack}>Get Outta Here</button>
    </section>
  )
}

export default UnauthorizedComp
