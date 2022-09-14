import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import ExerciseList from '../components/dashboardComponents/ExerciseRelated/ExerciseTable'
import UserCrud from '../components/dashboardComponents/WorkoutRelated/WorkoutTable'
import UserDash from '../components/dashboardComponents/WorkoutStats'
import { useGetExercisesQuery } from '../features/exerciseApiSlice'
import { addExerciseList, selectExercises } from '../features/exerciseSlice'
import { selectCurrentUser } from '../features/userSlice'
import { useGetWorkoutsQuery } from '../features/workoutApiSlice'
import { addWorkoutList, selectWorkouts } from '../features/workoutSlice'

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser)
  const workouts = useAppSelector(selectWorkouts)
  const exercises = useAppSelector(selectExercises)
  const [view, setView] = useState<number>(0)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleView = (num: number) => {
    setView(num)
  }

  const {
    data: workoutData,
    isLoading: workoutIsLoading,
    isSuccess: workoutSuccess,
    isError: workoutIsError,
  } = useGetWorkoutsQuery(user.userId as number)

  const {
    data: exerciseData,
    isLoading: exerciseIsLoading,
    isSuccess: exerciseSuccess,
    isError: exerciseIsError,
  } = useGetExercisesQuery(user.userId as number)

  useEffect(() => {
    if (workoutSuccess) {
      if (workouts.length === 0) {
        dispatch(addWorkoutList(workoutData))
      }
    }
    if (exerciseSuccess) {
      if (exercises.length === 0) {
        dispatch(addExerciseList(exerciseData))
      }
    }
  }, [workoutSuccess, exerciseSuccess, workouts, exercises, workoutData, exerciseData, dispatch])

  useEffect(() => {
    if (workoutIsError || exerciseIsError) {
      setTimeout(() => navigate('/login'), 3000)
    }
  }, [exerciseIsError, workoutIsError])

  let content

  if (workoutIsLoading || exerciseIsLoading) {
    content = (
      <section className='h-full w-full flex flex-col flex-center'>
        <h1 className='self-center'>Welcome Home, {user.fName} </h1>
        <div className='flex flex-col justify-center items-center'>
          <h3>Your dashboard is loading...</h3>
        </div>
      </section>
    )
  } else if (exerciseIsError || workoutIsError) {
    content = (
      <section className='h-full w-full flex flex-col flex-center'>
        <h1 className='self-center'>Welcome Home, {user.fName} </h1>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-center'>
            There was an error loading your dashboard. Redirecting you to the login page.
          </h3>
        </div>
      </section>
    )
  } else if (workoutSuccess && exerciseSuccess) {
    content = (
      <section className='h-full w-full flex flex-col flex-center'>
        <h1 className='self-center'>Welcome Home, {user.fName} </h1>
        <div className='flex flex-row items-center justify-evenly'>
          <button onClick={() => handleView(1)}>Add Workouts</button>
          <button onClick={() => handleView(2)}>See Stats</button>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          {view === 0 ? (
            ''
          ) : view === 1 ? (
            <div className='w-4/5'>
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
  return <div>{content}</div>
}

export default Dashboard
