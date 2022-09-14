import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Exercise } from '../../../features/exerciseSlice'
import { Workout } from '../../../features/workoutSlice'

const EditWorkoutRow = (props: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleUpdate: (id: number) => Promise<void>
  updatedWorkout: Workout
  handleEdit: () => void
  selectExercise: (e: React.ChangeEvent<HTMLInputElement>) => void
  addExercises: () => void
  ids: string[]
  exercises: Exercise[]
}) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const toggleRef = useRef<HTMLTableCellElement>(null)
  const handleToggle = (): void => {
    if (toggle === false) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (toggleRef.current && toggle && !toggleRef.current.contains(e.target as Node)) {
        setToggle(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [toggle])
  return (
    <tr>
      <th scope='row'>
        <input
          type='text'
          placeholder='Workout Name'
          name='workoutName'
          value={props.updatedWorkout.name}
          onChange={props.handleChange}
          required
        />
      </th>
      <td>
        <input
          type='date'
          name='workoutDate'
          value={props.updatedWorkout.date}
          onChange={props.handleChange}
          required
        />
      </td>
      <td ref={toggleRef}>
        <button className='m-0 w-full' onClick={handleToggle}>
          Edit Exercises
        </button>
        <ul
          className={
            toggle
              ? 'flex flex-col justify-center items-center text-sm border border-brand border-t-0 m-0 p-0'
              : 'hidden'
          }
        >
          {props.exercises.map((exercise) => (
            <li
              className='w-full h-fit m-0 py-1 border-b border-brand  hover:bg-brand-light hover:normal-case hover:font-normal'
              key={exercise.exerciseId}
            >
              <div className='flex flex-row w-full items-center justify-evenly'>
                <div className='flex flex-col items-center justify-center w-1/3'>
                  <input
                    type='checkbox'
                    value={exercise.exerciseId as number}
                    className='text-brand bg-white p-0 m-0'
                    onChange={props.selectExercise}
                    checked={
                      props.ids.includes((exercise.exerciseId as number).toString()) ? true : false
                    }
                  />
                </div>
                <div className='flex flex-col items-center justify-center w-2/3'>
                  <label className='text-brand p-0 m-0'>
                    <div>{exercise.name}</div>
                    <p className='text-xs text-gray-darkest p-0 m-0'>
                      Sets - {exercise.sets}, Reps - {exercise.reps}
                    </p>
                  </label>
                </div>
              </div>
            </li>
          ))}
          <button
            className='w-1/2'

            // onClick={addExercises}
          >
            Save
          </button>
        </ul>
      </td>
      <td className='text-right'>
        <button
          className='w-fit'
          disabled={
            props.updatedWorkout.name.trim().length < 3 ||
            props.updatedWorkout.date.trim().length === 0 ||
            props.updatedWorkout.exerciseList.toString().trim().length === 0
              ? true
              : false
          }
          // onClick={() => handleSave(workout.id as number)}
        >
          Save
        </button>
      </td>
    </tr>
  )
}

export default EditWorkoutRow
