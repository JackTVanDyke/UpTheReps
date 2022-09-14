import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  useDeleteExerciseMutation,
  useSaveExerciseMutation,
  useUpdateExerciseMutation,
} from '../../../features/exerciseApiSlice'
import {
  addExercise,
  editExercise,
  Exercise,
  removeExercise,
  selectExercises,
} from '../../../features/exerciseSlice'
import { selectCurrentUser } from '../../../features/userSlice'
import EditExerciseRow from './EditExerciseRow'
import ExerciseRows from './ExerciseRows'
import InputExerciseRow from './InputExerciseRow'
const ExerciseList = () => {
  const exercises = useAppSelector(selectExercises)
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const [save, { isLoading: saveIsLoading }] = useSaveExerciseMutation()
  const [updateExercise, { isLoading: updateIsLoading }] = useUpdateExerciseMutation()
  const [deleteExercise, { isLoading: deleteIsLoading }] = useDeleteExerciseMutation()
  const [newExercise, setNewExercise] = useState<Exercise>({
    exerciseId: null,
    name: '',
    sets: '',
    reps: '',
    weight: '',
    bodyPart: '',
  })
  const [edit, setEdit] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | null>(null)

  const clearInputs = (): void => {
    setNewExercise({ exerciseId: null, name: '', sets: '', reps: '', weight: '', bodyPart: '' })
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
    setEditId(id)
    setNewExercise(exercises.find((exercise) => exercise.exerciseId === id) as Exercise)
    handleEdit()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewExercise({
      ...newExercise,
      [e.target.name]: e.target.value,
    })
  }

  const handleAdd = async () => {
    try {
      await save({
        name: newExercise.name,
        sets: parseInt(newExercise.sets),
        reps: parseInt(newExercise.reps),
        weight: parseInt(newExercise.weight),
        bodyPart: newExercise.bodyPart,
        userId: user.userId as number,
      })
      const newId = (exercises[exercises.length - 1].exerciseId as number) + 1
      dispatch(
        addExercise({
          exerciseId: newId,
          name: newExercise.name,
          sets: newExercise.sets,
          reps: newExercise.reps,
          weight: newExercise.weight,
          bodyPart: newExercise.bodyPart,
        }),
      )
      clearInputs()
    } catch (err: FetchBaseQueryError | unknown) {
      alert('There was an error saving your exercise.')
    }
  }

  const handleUpdate = async (id: number) => {
    if (
      newExercise.name.trim().length > 2 &&
      newExercise.sets.toString().trim().length > 0 &&
      newExercise.reps.toString().trim().length > 0 &&
      newExercise.weight.toString().trim().length > 0 &&
      newExercise.bodyPart.trim().length > 2
    ) {
      try {
        await updateExercise({
          exerciseId: newExercise.exerciseId as number,
          name: newExercise.name,
          sets: parseInt(newExercise.sets),
          reps: parseInt(newExercise.reps),
          weight: parseInt(newExercise.weight),
          bodyPart: newExercise.bodyPart,
          userId: user.userId as number,
        })
        dispatch(
          editExercise({
            exerciseId: id,
            name: newExercise.name,
            sets: newExercise.sets,
            reps: newExercise.reps,
            weight: newExercise.weight,
            bodyPart: newExercise.bodyPart,
          }),
        )
      } catch (err: FetchBaseQueryError | unknown) {
        alert('There was an error updating your exercise.')
      }
      handleEdit()
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteExercise({
        exerciseId: id,
        name: newExercise.name,
        sets: parseInt(newExercise.sets),
        reps: parseInt(newExercise.reps),
        weight: parseInt(newExercise.weight),
        bodyPart: newExercise.bodyPart,
        userId: user.userId as number,
      })
      dispatch(removeExercise(id))
    } catch (err: FetchBaseQueryError | unknown) {
      alert('There was an error updating your exercise.')
    }
  }

  return (
    <section className='h-full w-full flex justify-center items-center'>
      <div className='overflow-auto bg-brand w-full max-w-3xl rounded-xl p-4 m-4'>
        <table>
          <thead>
            <tr className='hover:bg-brand'>
              <th scope='col'>Exercise</th>
              <th scope='col'>Sets</th>
              <th scope='col'>Reps</th>
              <th scope='col'>Weight</th>
              <th scope='col'>Body Part</th>
              <th scope='col' className='text-right'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {edit ? (
              ''
            ) : (
              <InputExerciseRow
                handleAdd={handleAdd}
                handleChange={handleChange}
                newExercise={newExercise}
              />
            )}
            {exercises
              .filter(({ exerciseId }) => exerciseId === editId)
              .map((exercise) => {
                return (
                  <div key={exercise.exerciseId as number}>
                    <EditExerciseRow
                      handleChange={handleChange}
                      updatedExercise={newExercise}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                    />
                  </div>
                )
              })}
            {exercises
              .filter(({ exerciseId }) => exerciseId !== editId)
              .map((exercise) => {
                return (
                  <div key={exercise.exerciseId as number}>
                    <ExerciseRows
                      handleDelete={handleDelete}
                      exercise={exercise}
                      handleEditId={handleEditId}
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

export default ExerciseList
