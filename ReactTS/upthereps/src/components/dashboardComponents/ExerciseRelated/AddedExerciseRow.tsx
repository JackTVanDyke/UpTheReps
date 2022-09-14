import React from 'react'

const AddedExerciseRow = (props: {
  handleEditId: (id: number) => void
  handleDelete: (id: number) => Promise<void>
  exerciseId: number
  name: string
  sets: string
  reps: string
  weight: string
  bodyPart: string
}) => {
  return (
    <tr key={props.exerciseId}>
      <th scope='row'>{props.name}</th>
      <td>{props.sets}</td>
      <td>{props.reps}</td>
      <td>{props.weight}</td>
      <td>{props.bodyPart}</td>
      <td className='text-right'>
        <button className='w-fit m-0' onClick={() => props.handleDelete(props.exerciseId)}>
          X
        </button>
        <button
          className='w-fit m-0 border-l-0'
          onClick={() => props.handleEditId(props.exerciseId)}
        >
          Edit
        </button>
      </td>
    </tr>
  )
}

export default AddedExerciseRow
