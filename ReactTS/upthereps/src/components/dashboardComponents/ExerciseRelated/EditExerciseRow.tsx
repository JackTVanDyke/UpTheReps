import React, { ChangeEvent, useEffect, useState } from 'react'
import { Exercise } from '../../../features/exerciseSlice'

const EditExerciseRow = (props: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleUpdate: (id: number) => Promise<void>
  updatedExercise: Exercise
  handleEdit: () => void
}) => {
  return (
    <tr>
      <th scope='row'>
        <input
          type='text'
          placeholder='Name'
          value={props.updatedExercise.name}
          name='name'
          onChange={props.handleChange}
          required
        />
      </th>
      <td>
        <input
          type='text'
          placeholder='Sets'
          value={props.updatedExercise.sets}
          name='sets'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Reps'
          value={props.updatedExercise.reps}
          name='reps'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Weight'
          value={props.updatedExercise.weight}
          name='weight'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Body Part'
          value={props.updatedExercise.bodyPart}
          name='bodyPart'
          onChange={props.handleChange}
          required
        />
      </td>
      <td className='text-right'>
        <button className='w-fit m-0' onClick={props.handleEdit}>
          X
        </button>
        <button
          disabled={
            props.updatedExercise.name.trim().length < 2 ||
            props.updatedExercise.sets.toString().trim().length === 0 ||
            props.updatedExercise.reps.toString().trim().length === 0 ||
            props.updatedExercise.weight.toString().trim().length === 0 ||
            props.updatedExercise.bodyPart.trim().length < 3
              ? true
              : false
          }
          className='w-fit m-0 border-l-0'
          onClick={() => props.handleUpdate(props.updatedExercise.exerciseId as number)}
        >
          Save
        </button>
      </td>
    </tr>
  )
}

export default EditExerciseRow
