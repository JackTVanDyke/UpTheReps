import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Exercise } from '../../../features/exerciseSlice'
import { Workout } from '../../../features/workoutSlice'

const InputWorkoutRow = (props: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAdd: () => Promise<void>
  newWorkout: Workout
  exercises: Exercise[]
  selectExercise: (e: React.ChangeEvent<HTMLInputElement>) => void
  addExercises: () => void
  ids: string[]
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
          name='name'
          value={props.newWorkout.name}
          onChange={props.handleChange}
          required
        />
      </th>
      <td>
        <input
          type='date'
          name='date'
          value={props.newWorkout.date}
          onChange={props.handleChange}
          required
        />
      </td>
      <td ref={toggleRef} className='flex flex-col justify-center items-center'>
        <button className='m-0 w-36' onClick={handleToggle}>
          Add Exercises
        </button>
        <div className={toggle ? 'overflow-y-auto w-36 h-40' : 'hidden'}>
          <ul
            className={
              toggle
                ? 'flex flex-col justify-center items-center text-sm text-left border border-brand border-t-0 m-0 p-0 '
                : 'hidden'
            }
          >
            {props.exercises.map((exercise) => (
              <li
                className='w-full h-full m-0 py-1 border-b border-brand hover:bg-white hover:normal-case hover:font-normal'
                key={exercise.exerciseId}
              >
                <div className='flex flex-row w-full'>
                  <div className='flex flex-col w-1/3 items-start justify-center'>
                    <input
                      type='checkbox'
                      value={exercise.exerciseId as number}
                      className='text-brand bg-white p-0 m-0'
                      onChange={props.selectExercise}
                      checked={
                        props.ids.includes((exercise.exerciseId as number).toString())
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className='flex flex-col items-end justify-center w-2/3 text-right'>
                    <label className='text-brand text-sm p-0 m-0'>
                      <div>{exercise.name}</div>
                      <p className='text-xs text-gray-darkest p-0 m-0'>
                        Sets: {exercise.sets} Reps: {exercise.reps}
                      </p>
                    </label>
                  </div>
                </div>
              </li>
            ))}
            <button className='w-3/5' onClick={(props.addExercises, handleToggle)}>
              Save
            </button>
          </ul>
        </div>
      </td>
      <td className='text-right'>
        <button
          className='w-fit'
          disabled={
            props.newWorkout.name.trim().length < 3 ||
            props.newWorkout.date.trim().length === 0 ||
            props.newWorkout.exerciseList.toString().trim().length === 0
              ? true
              : false
          }
          onClick={props.handleAdd}
        >
          +
        </button>
      </td>
    </tr>
  )
}

export default InputWorkoutRow
