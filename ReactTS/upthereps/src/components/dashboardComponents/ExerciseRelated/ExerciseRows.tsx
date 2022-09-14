import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectExercises } from '../../../features/exerciseSlice'
import AddedExerciseRow from './AddedExerciseRow'

const ExerciseRows = (props: {
  exercise: {
    exerciseId: number | null
    name: string
    sets: string
    reps: string
    weight: string
    bodyPart: string
  }
  handleDelete: (id: number) => Promise<void>
  handleEditId: (id: number) => void
}) => {
  return (
    <AddedExerciseRow
      key={props.exercise.exerciseId}
      exerciseId={props.exercise.exerciseId as number}
      name={props.exercise.name}
      sets={props.exercise.sets}
      reps={props.exercise.reps}
      weight={props.exercise.weight}
      bodyPart={props.exercise.bodyPart}
      handleDelete={props.handleDelete}
      handleEditId={props.handleEditId}
    />
  )
}

export default ExerciseRows
