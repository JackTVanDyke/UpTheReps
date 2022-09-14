import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Exercise, selectExercises } from '../../../features/exerciseSlice'
import {
  addWorkout,
  editWorkout,
  removeWorkout,
  selectWorkouts,
  Workout,
} from '../../../features/workoutSlice'
import { selectCurrentUser } from '../../../features/userSlice'
import InputWorkoutRow from './InputWorkoutRow'
import EditWorkoutRow from './EditWorkoutRow'
import AddedWorkoutRow from './AddedWorkoutRow'
import {
  useDeleteWorkoutMutation,
  useSaveWorkoutMutation,
  useUpdateWorkoutMutation,
} from '../../../features/workoutApiSlice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const WorkoutTable = () => {
  const workouts = useAppSelector(selectWorkouts)
  const exercises = useAppSelector(selectExercises)
  const user = useAppSelector(selectCurrentUser)
  const [save] = useSaveWorkoutMutation()
  const [updateWorkout] = useUpdateWorkoutMutation()
  const [deleteWorkout] = useDeleteWorkoutMutation()
  const dispatch = useAppDispatch()
  const [newWorkout, setNewWorkout] = useState<Workout>({
    workoutId: 0,
    name: '',
    date: '',
    exerciseList: [],
  })
  const [edit, setEdit] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [toggle, setToggle] = useState<boolean>(false)
  const [ids, setIds] = useState<string[]>([])

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewWorkout({
      ...newWorkout,
      [e.target.name]: e.target.value,
    })
  }

  const addExercises = () => {
    setNewWorkout({
      ...newWorkout,
      exerciseList: exercises.filter((exercise) =>
        ids.includes((exercise.exerciseId as number).toString()),
      ),
    })
    setToggle(false)
    setIds([])
  }

  const clearInputs = (): void => {
    setNewWorkout({
      workoutId: 0,
      name: '',
      date: '',
      exerciseList: [],
    })
    setIds([])
  }

  const handleEdit = (): void => {
    if (edit === false) {
      setEdit(true)
    } else {
      setEdit(false)
      setEditId(null)
      clearInputs()
    }
  }

  const handleEditId = (id: number): void => {
    const thisWorkout = workouts.find((workout) => workout.workoutId === id) as Workout
    setEditId(id)
    setNewWorkout({
      workoutId: thisWorkout.workoutId as number,
      name: thisWorkout.name,
      date: thisWorkout.date,
      exerciseList: thisWorkout.exerciseList,
    })
    handleEdit()
  }

  const handleAdd = async () => {
    try {
      await save({
        name: newWorkout.name,
        date: newWorkout.date,
        exerciseIds: ids.map((id) => parseInt(id)),
        user: user.userId as number,
      })
      dispatch(
        addWorkout({
          workoutId: (workouts[workouts.length - 1].workoutId as number) + 1,
          name: newWorkout.name,
          date: newWorkout.date,
          exerciseList: newWorkout.exerciseList,
        }),
      )
      clearInputs()
    } catch (err: FetchBaseQueryError | unknown) {
      alert('There was an error saving your workout.')
    }
  }

  const handleUpdate = async (id: number) => {
    try {
      await updateWorkout({
        workoutId: newWorkout.workoutId as number,
        name: newWorkout.name,
        date: newWorkout.date,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        exerciseIds: ids.map((id) => parseInt(id)),
        user: user.userId as number,
      })
      dispatch(
        editWorkout({
          workoutId: id,
          name: newWorkout.name,
          date: newWorkout.date,
          exerciseList: newWorkout.exerciseList,
        }),
      )
    } catch (err: FetchBaseQueryError | unknown) {
      alert('There was an error updating your workout.')
    }
    handleEdit()
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkout({
        workoutId: newWorkout.workoutId as number,
        name: newWorkout.name,
        date: newWorkout.date,
        exerciseList: newWorkout.exerciseList,
        user: user.userId as number,
      })
      dispatch(removeWorkout(id))
    } catch (err: FetchBaseQueryError | unknown) {
      alert('There was an error deleting your workout.')
    }
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
    <section className='h-full w-full flex justify-center items-center'>
      <div className='overflow-auto bg-brand w-full max-w-3xl rounded-xl p-4 m-4'>
        <table>
          <thead>
            <tr className='hover:bg-brand'>
              <th scope='col'>Workout</th>
              <th scope='col'>Date</th>
              <th scope='col'>Exercises</th>
              <th scope='col' className='text-right'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {edit ? (
              ''
            ) : (
              <InputWorkoutRow
                newWorkout={newWorkout}
                exercises={exercises}
                handleChange={handleChange}
                handleAdd={handleAdd}
                selectExercise={selectExercise}
                addExercises={addExercises}
                ids={ids}
              />
            )}
            {workouts
              .filter(({ workoutId }) => workoutId === editId)
              .map((workout) => {
                return (
                  <div key={workout.workoutId as number}>
                    <EditWorkoutRow
                      handleChange={handleChange}
                      handleUpdate={handleUpdate}
                      updatedWorkout={newWorkout}
                      handleEdit={handleEdit}
                      selectExercise={selectExercise}
                      addExercises={addExercises}
                      ids={ids}
                      exercises={exercises}
                    />
                  </div>
                )
              })}
            {workouts
              .filter(({ workoutId }) => workoutId !== editId)
              .map((workout) => {
                return (
                  <div key={workout.workoutId as number}>
                    <AddedWorkoutRow
                      handleEditId={handleEditId}
                      handleDelete={handleDelete}
                      formatDate={formatDate}
                      workoutId={workout.workoutId as number}
                      name={workout.name}
                      date={workout.date}
                      exerciseList={workout.exerciseList}
                    />
                  </div>
                )
              })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default WorkoutTable
