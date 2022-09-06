import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addExercise,
  removeExercise,
  editExercise,
  selectExercises,
} from '../features/exerciseSlice'

const ExerciseList = () => {
  const exercises = useAppSelector(selectExercises)
  const dispatch = useAppDispatch()
  const [exerciseName, setExerciseName] = useState<string>('')
  const [exerciseSets, setExerciseSets] = useState<string>('')
  const [exerciseReps, setExerciseReps] = useState<string>('')
  const [exerciseWeight, setExerciseWeight] = useState<string>('')
  const [exerciseBodyPart, setExerciseBodyPart] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)

  const clearInputs = (): void => {
    setExerciseName('')
    setExerciseSets('')
    setExerciseReps('')
    setExerciseWeight('')
    setExerciseBodyPart('')
  }

  const handleEdit = (): void => {
    setEdit(!edit)
  }

  const handleAdd = (): void => {
    dispatch(
      addExercise({
        id: null,
        exercise: exerciseName,
        sets: exerciseSets,
        reps: exerciseReps,
        weight: exerciseWeight,
        bodyPart: exerciseBodyPart,
      }),
    )
    clearInputs()
  }

  const handleSave = (id: number): void => {
    dispatch(
      editExercise({
        id: id,
        exercise: exerciseName,
        sets: exerciseSets,
        reps: exerciseReps,
        weight: exerciseWeight,
        bodyPart: exerciseBodyPart,
      }),
    )
    setEdit(!edit)
  }

  return (
    <section className='h-full w-full flex flex-col justify-center items-center'>
      <div className='bg-brand flex flex-col items-center justify-center h-full min-w-[60%] p-4 m-4 rounded-xl'>
        <table className='w-full text-left bg-white text-black'>
          <thead className='w-full uppercase bg-brand text-white flex flex-row justify-evenly items-center'>
            <tr className='w-full flex flex-row justify-between items-center'>
              <th scope='col' className='p-2 m-2'>
                Exercise
              </th>
              <th scope='col' className='p-2 m-2'>
                Sets
              </th>
              <th scope='col' className='p-2 m-2'>
                Reps
              </th>
              <th scope='col' className='p-2 m-2'>
                Weight
              </th>
              <th scope='col' className='p-2 m-2'>
                Body Part
              </th>
              <th className='p-2 m-2'>Edit</th>
            </tr>
          </thead>
          <tbody className='min-w-full flex flex-col justify-center items-center'>
            <tr className='w-full flex flex-row justify-between items-center'>
              <th scope='row' className='p-2'>
                <input
                  className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Exercise Name'
                  value={exerciseName}
                  name='exercise'
                  onChange={(e) => setExerciseName(e.target.value)}
                  required
                />
              </th>
              <td className='p-2'>
                <input
                  className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Sets'
                  value={exerciseSets}
                  name='sets'
                  onChange={(e) => setExerciseSets(e.target.value)}
                  required
                />
              </td>
              <td className='p-2'>
                <input
                  className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Reps'
                  value={exerciseReps}
                  name='reps'
                  onChange={(e) => setExerciseReps(e.target.value)}
                  required
                />
              </td>
              <td className='p-2'>
                <input
                  className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Weight'
                  value={exerciseWeight}
                  name='weight'
                  onChange={(e) => setExerciseWeight(e.target.value)}
                  required
                />
              </td>
              <td className='p-2'>
                <input
                  className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                  type='text'
                  placeholder='Body Part'
                  value={exerciseBodyPart}
                  name='bodyPart'
                  onChange={(e) => setExerciseBodyPart(e.target.value)}
                  required
                />
              </td>
              <td className='p-2'>
                <button
                  disabled={
                    exerciseName.trim().length < 3 ||
                    exerciseSets.trim().length === 0 ||
                    exerciseReps.trim().length === 0 ||
                    exerciseWeight.trim().length === 0 ||
                    exerciseBodyPart.trim().length < 3
                      ? true
                      : false
                  }
                  className='w-fit'
                  onClick={handleAdd}
                >
                  +
                </button>
              </td>
            </tr>
            {exercises.map((exercise) => {
              return (
                <tr key={exercise.id} className='w-full flex flex-row justify-between items-center'>
                  {edit ? (
                    <div className='w-full'>
                      <th scope='row' className='p-2'>
                        <input
                          className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Exercise Name'
                          value={exerciseName}
                          name='exercise'
                          onChange={(e) => setExerciseName(e.target.value)}
                          required
                        />
                      </th>
                      <td className='p-2'>
                        <input
                          className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Sets'
                          value={exerciseSets}
                          name='sets'
                          onChange={(e) => setExerciseSets(e.target.value)}
                          required
                        />
                      </td>
                      <td className='p-2'>
                        <input
                          className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Reps'
                          value={exerciseReps}
                          name='reps'
                          onChange={(e) => setExerciseReps(e.target.value)}
                          required
                        />
                      </td>
                      <td className='p-2'>
                        <input
                          className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Weight'
                          value={exerciseWeight}
                          name='weight'
                          onChange={(e) => setExerciseWeight(e.target.value)}
                          required
                        />
                      </td>
                      <td className='p-2'>
                        <input
                          className='p-2 m-2 cursor-pointer text-brand text-xl font-semibold w-fit sm:w-full'
                          type='text'
                          placeholder='Body Part'
                          value={exerciseBodyPart}
                          name='bodyPart'
                          onChange={(e) => setExerciseBodyPart(e.target.value)}
                          required
                        />
                      </td>
                      <td className='p-2'>
                        <button
                          disabled={
                            exerciseName.trim().length < 3 ||
                            exerciseSets.trim().length === 0 ||
                            exerciseReps.trim().length === 0 ||
                            exerciseWeight.trim().length === 0 ||
                            exerciseBodyPart.trim().length < 3
                              ? true
                              : false
                          }
                          className='w-fit'
                          onClick={() => handleSave(exercise.id as number)}
                        >
                          Save
                        </button>
                      </td>
                    </div>
                  ) : (
                    <div className='w-full flex flex-row justify-between items-center'>
                      <th scope='row' className='p-2'>
                        {exercise.exercise}
                      </th>
                      <td className='p-2'>{exercise.sets}</td>
                      <td className='p-2'>{exercise.reps}</td>
                      <td className='p-2'>{exercise.weight}</td>
                      <td className='p-2'>{exercise.bodyPart}</td>
                      <td className='p-2'>
                        <button className='w-fit m-0' onClick={handleEdit}>
                          Edit
                        </button>
                        <button
                          className='w-fit m-0 border-l-0'
                          onClick={() => dispatch(removeExercise(exercise.id as number))}
                        >
                          X
                        </button>
                      </td>
                    </div>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExerciseList
