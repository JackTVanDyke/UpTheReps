import React, { useEffect, useState } from 'react'
import ExerciseList from '../components/ExerciseList'
import UserCrud from '../components/UserCrud'
import UserDash from '../components/UserDash'

const Dashboard = () => {
  const [view, setView] = useState<number>(0)
  const handleView = (num: number) => {
    setView(num)
  }
  return (
    <section>
      <h1 className='self-start ml-8'>Welcome Home, </h1>
      <div className='flex flex-col justify-center items-center'>
        {view === 0 ? <h3 className=''>What Would You Like To Do?</h3> : ''}
      </div>
      <div className='flex flex-row items-center justify-evenly'>
        <button onClick={() => handleView(1)}>Add Workouts</button>
        <button onClick={() => handleView(2)}>See Stats</button>
      </div>
      <div>
        {view === 0 ? (
          ''
        ) : view === 1 ? (
          <div>
            <UserCrud />
            <ExerciseList />
          </div>
        ) : (
          <UserDash />
        )}
      </div>
    </section>
  )
}

export default Dashboard
