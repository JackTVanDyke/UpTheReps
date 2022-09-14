import React, { ChangeEvent } from 'react'
import { Exercise } from '../../../features/exerciseSlice'

const InputExerciseRow = (props: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAdd: () => Promise<void>
  newExercise: Exercise
}) => {
  return (
    <tr>
      <th scope='row'>
        <input
          type='text'
          className=''
          placeholder='Exercise Name'
          value={props.newExercise.name}
          name='name'
          onChange={props.handleChange}
          required
        />
      </th>
      <td>
        <input
          type='text'
          placeholder='Sets'
          value={props.newExercise.sets}
          name='sets'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Reps'
          value={props.newExercise.reps}
          name='reps'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Weight'
          value={props.newExercise.weight}
          name='weight'
          onChange={props.handleChange}
          required
        />
      </td>
      <td>
        <input
          type='text'
          placeholder='Body Part'
          value={props.newExercise.bodyPart}
          name='bodyPart'
          onChange={props.handleChange}
          required
        />
      </td>
      <td className='text-right'>
        <button
          disabled={
            props.newExercise.name.trim().length < 2 ||
            props.newExercise.sets.trim().length === 0 ||
            props.newExercise.reps.trim().length === 0 ||
            props.newExercise.weight.trim().length === 0 ||
            props.newExercise.bodyPart.trim().length < 2
              ? true
              : false
          }
          className='w-fit'
          onClick={props.handleAdd}
        >
          +
        </button>
      </td>
    </tr>
  )
}

export default InputExerciseRow
