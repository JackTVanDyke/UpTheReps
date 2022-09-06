import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectExercises } from '../features/exerciseSlice'
import { addWorkout, editWorkout, removeWorkout, selectWorkouts } from '../features/workoutSlice'

const UserCrud = () => {
  const workouts = useAppSelector(selectWorkouts)
  const exercises = useAppSelector(selectExercises)
  const dispatch = useAppDispatch()
  const [workoutName, setworkoutName] = useState<string>('')
  const [workoutDate, setWorkoutDate] = useState<string>('')
  const [workoutExercises, setWorkoutExercises] = useState<typeof exercises>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [listToggle, setListToggle] = useState<boolean>(false)
  const [editListToggle, setEditListToggle] = useState<boolean>(false)
  const [ids, setIds] = useState<string[]>([])
  const toggleRef = useRef<HTMLDivElement>(null)
  const listToggleRef = useRef<HTMLDivElement>(null)
  const editListToggleRef = useRef<HTMLDivElement>(null)

  const selectExercise = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.currentTarget.value
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId)
      setIds(newIds)
    } else {
      const newIds = [...ids]
      newIds.push(selectedId)
      setIds(newIds)
    }
  }

  const addExercises = () => {
    setWorkoutExercises(
      exercises.filter((exercise) => ids.includes((exercise.id as number).toString())),
    )
    setToggle(false)
    setIds([])
  }

  const handleToggle = (): void => {
    setToggle(!toggle)
  }

  const handleListToggle = (): void => {
    setListToggle(!listToggle)
  }

  const handleEditListToggle = (): void => {
    setEditListToggle(!editListToggle)
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

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        listToggleRef.current &&
        listToggle &&
        !listToggleRef.current.contains(e.target as Node)
      ) {
        setListToggle(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [listToggle])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        editListToggleRef.current &&
        editListToggle &&
        !editListToggleRef.current.contains(e.target as Node)
      ) {
        setListToggle(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [editListToggle])

  const clearInputs = (): void => {
    setworkoutName('')
    setWorkoutDate('')
    setWorkoutExercises([])
    setIds([])
  }

  const handleEdit = (): void => {
    setEdit(!edit)
  }

  const handleAdd = (): void => {
    dispatch(
      addWorkout({
        id: workouts.length + 1,
        workout: workoutName,
        date: workoutDate,
        exercises: workoutExercises,
      }),
    )
    clearInputs()
  }

  const handleSave = (id: number): void => {
    dispatch(
      editWorkout({
        id: id,
        workout: workoutName,
        date: workoutDate,
        exercises: workoutExercises,
      }),
    )
    clearInputs()
    setEdit(!edit)
  }

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate)
    if (!isNaN(date.getTime())) {
      const day = (date.getDate() + 1).toString()
      const month = (date.getMonth() + 1).toString()
      return (
        (month[1] ? month : '0' + month[0]) +
        '/' +
        (day[1] ? day : '0' + day[0]) +
        '/' +
        date.getFullYear().toString()
      )
    }
  }

  return (
    <section className='h-full w-full flex flex-col'>
      <div className='bg-brand flex flex-col h-full min-w-[60%] p-4 m-4 rounded-xl'>
        <table className='table-fixed w-full bg-white text-black'>
          <thead className='w-full flex flex-row items-center justify-evenly uppercase bg-brand text-white'>
            <tr className='w-full flex flex-row items-center  text-left'>
              <th scope='col' className='p-2 m-2 w-[30%]'>
                Workout
              </th>
              <th scope='col' className='p-2 m-2 w-[30%]'>
                Date
              </th>
              <th scope='col' className='p-2 m-2 w-[30%]'>
                Exercises
              </th>
              <th scope='col' className='p-2 m-2 w-[10%] text-right'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className='w-full flex flex-col items-start justify-center'>
            <tr className='w-full flex flex-row items-center justify-start'>
              <th scope='row' className='py-2 my-2 w-[30%]'>
                <input
                  className='py-2 mx-1 cursor-pointer text-brand text-lg font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Workout Name'
                  name='workoutName'
                  value={workoutName}
                  onChange={(e) => setworkoutName(e.target.value)}
                  required
                />
              </th>
              <td className='py-2 my-2 w-[30%]'>
                <input
                  className='py-2 mx-1 cursor-pointer text-brand text-lg font-semibold w-fit sm:w-fit'
                  type='date'
                  name='workoutDate'
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  required
                />
              </td>
              <div ref={toggleRef}>
                <td className='py-2 my-2 w-[30%]'>
                  <button className='py-2 px-5 m-0 w-full' onClick={handleToggle}>
                    Add Exercises
                  </button>
                  <ul
                    className={
                      toggle
                        ? 'flex flex-col justify-center items-center text-sm border border-brand border-t-0 m-0 p-0'
                        : 'hidden'
                    }
                  >
                    {exercises.map((exercise) => (
                      <li
                        className='w-full h-fit m-0 py-1 border-b border-brand  hover:bg-brand-light hover:normal-case hover:font-normal'
                        key={exercise.id}
                      >
                        <div className='flex flex-row w-full items-center justify-evenly'>
                          <div className='flex flex-col items-center justify-center w-1/3'>
                            <input
                              type='checkbox'
                              value={exercise.id as number}
                              className='text-brand bg-white p-0 m-0'
                              onChange={selectExercise}
                              checked={
                                ids.includes((exercise.id as number).toString()) ? true : false
                              }
                            />
                          </div>
                          <div className='flex flex-col items-center justify-center w-2/3'>
                            <label className='text-brand p-0 m-0'>
                              <div>{exercise.exercise}</div>
                              <p className='text-xs text-gray-darkest p-0 m-0'>
                                Sets - {exercise.sets}, Reps - {exercise.reps}
                              </p>
                            </label>
                          </div>
                        </div>
                      </li>
                    ))}
                    <button className='w-1/2' onClick={addExercises}>
                      Save
                    </button>
                  </ul>
                </td>
              </div>
              <td className='py-2 my-2 w-1/5 flex justify-end'>
                <button
                  className='w-fit py-2 mx-1'
                  disabled={
                    workoutName.trim().length < 3 ||
                    workoutDate.trim().length === 0 ||
                    workoutExercises.toString().trim().length === 0
                      ? true
                      : false
                  }
                  onClick={handleAdd}
                >
                  +
                </button>
              </td>
            </tr>
            {workouts.map((workout) => {
              return (
                <div className='w-full flex flex-row items-center justify-start' key={workout.id}>
                  {edit ? (
                    <tr className='w-full flex flex-row items-center justify-start'>
                      <th scope='row' className='py-2 my-2 w-[30%]'>
                        <input
                          className='py-2 mx-1 cursor-pointer text-brand text-lg font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Workout Name'
                          name='workoutName'
                          value={workoutName}
                          onChange={(e) => setworkoutName(e.target.value)}
                          required
                        />
                      </th>
                      <td className='py-2 my-2 w-[30%]'>
                        <input
                          className='py-2 mx-1 cursor-pointer text-brand text-lg font-semibold w-fit sm:w-fit'
                          type='date'
                          name='workoutDate'
                          value={workoutDate}
                          onChange={(e) => setWorkoutDate(e.target.value)}
                          required
                        />
                      </td>
                      <div ref={editListToggleRef}>
                        <td className='py-2 my-2 w-[30%]'>
                          <button className='py-2 px-5 m-0 w-full' onClick={handleEditListToggle}>
                            Edit Exercises
                          </button>
                          <ul
                            className={
                              editListToggle
                                ? 'flex flex-col justify-center items-center text-sm border border-brand border-t-0 m-0 p-0'
                                : 'hidden'
                            }
                          >
                            {exercises.map((exercise) => (
                              <li
                                className='w-full h-fit m-0 py-1 border-b border-brand  hover:bg-brand-light hover:normal-case hover:font-normal'
                                key={exercise.id}
                              >
                                <div className='flex flex-row w-full items-center justify-evenly'>
                                  <div className='flex flex-col items-center justify-center w-1/3'>
                                    <input
                                      type='checkbox'
                                      value={exercise.id as number}
                                      className='text-brand bg-white p-0 m-0'
                                      onChange={selectExercise}
                                      checked={
                                        ids.includes((exercise.id as number).toString())
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                  <div className='flex flex-col items-center justify-center w-2/3'>
                                    <label className='text-brand p-0 m-0'>
                                      <div>{exercise.exercise}</div>
                                      <p className='text-xs text-gray-darkest p-0 m-0'>
                                        Sets - {exercise.sets}, Reps - {exercise.reps}
                                      </p>
                                    </label>
                                  </div>
                                </div>
                              </li>
                            ))}
                            <button className='w-1/2' onClick={addExercises}>
                              Save
                            </button>
                          </ul>
                        </td>
                      </div>
                      <td className='py-2 my-2 w-1/5 flex justify-end'>
                        <button
                          className='w-fit py-2 mx-1'
                          disabled={
                            workoutName.trim().length < 3 ||
                            workoutDate.trim().length === 0 ||
                            workoutExercises.toString().trim().length === 0
                              ? true
                              : false
                          }
                          onClick={() => handleSave(workout.id as number)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr className='w-full flex flex-row items-center justify-start text-left'>
                      <th scope='row' className='py-2 my-2 mx-1 w-[30%] flex justify-start'>
                        <h3 className='py-2 mx-1 text-brand w-fit'>{workout.workout}</h3>
                      </th>
                      <td className='py-2 my-2 mx-1 w-[30%] text-2xl flex justify-start'>
                        <h3 className='py-2 mx-1 text-brand w-fit'>{formatDate(workout.date)}</h3>
                      </td>
                      <div ref={listToggleRef}>
                        <td className='py-2 my-2 w-[30%]'>
                          <button className='py-2 px-5 m-0 w-full' onClick={handleListToggle}>
                            See Exercises
                          </button>
                          <ul
                            className={
                              listToggle
                                ? 'flex flex-col justify-center items-center text-sm border border-brand border-t-0 m-0 p-0'
                                : 'hidden'
                            }
                          >
                            {workout.exercises.map((exer) => {
                              return (
                                <li
                                  className='w-full h-fit m-0 py-1 border-b border-brand   hover:normal-case hover:font-semibold
                                      hover:cursor-default'
                                  key={exer.id}
                                >
                                  <h3 className='w-fit p-0 m-0 text-sm'>{exer.exercise}</h3>
                                  <p className='text-xs text-gray-darkest p-0 m-0'>
                                    Sets - {exer.sets}, Reps -{exer.reps}
                                  </p>
                                </li>
                              )
                            })}
                          </ul>
                        </td>
                      </div>
                      <td className='py-2 my-2 w-1/5 text-right flex justify-end'>
                        <button className='w-fit m-0' onClick={handleEdit}>
                          Edit
                        </button>
                        <button
                          className='w-fit m-0 border-l-0'
                          onClick={() => dispatch(removeWorkout(workout.id as number))}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  )}
                </div>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UserCrud
