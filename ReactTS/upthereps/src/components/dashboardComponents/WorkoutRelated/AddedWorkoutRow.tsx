import React, { useRef, useState } from 'react'
import { Exercise } from '../../../features/exerciseSlice'

const AddedWorkoutRow = (props: {
  handleEditId: (id: number) => void
  handleDelete: (id: number) => Promise<void>
  formatDate: (inputDate: string) => string | undefined
  workoutId: number
  name: string
  date: string
  exerciseList: Exercise[]
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
  return (
    <tr key={props.workoutId}>
      <th scope='row'>{props.name}</th>
      <td>{props.formatDate(props.date)}</td>
      <td ref={toggleRef} className='flex flex-col justify-center items-center'>
        <button className='w-36 m-0' onClick={handleToggle}>
          See Exercises
        </button>
        <ul
          className={
            toggle
              ? 'flex flex-col justify-center items-center text-sm border border-brand border-t-0 m-0 p-0 w-36'
              : 'hidden'
          }
        >
          {props.exerciseList.map((exer) => {
            return (
              <li
                className='w-full h-fit m-0 py-1 border-b border-brand hover:normal-case hover:font-semibold hover:cursor-default'
                key={exer.exerciseId}
              >
                <h3 className='w-fit p-0 m-0 text-sm'>{exer.name}</h3>
                <p className='text-xs text-gray-darkest p-0 m-0'>
                  Sets - {exer.sets}, Reps -{exer.reps}
                </p>
              </li>
            )
          })}
        </ul>
      </td>
      <td className='text-right'>
        <button className='w-fit m-0' onClick={() => props.handleDelete(props.workoutId)}>
          X
        </button>
        <button
          className='w-fit m-0 border-l-0'
          onClick={() => props.handleEditId(props.workoutId)}
        >
          Edit
        </button>
      </td>
    </tr>
  )
}

export default AddedWorkoutRow
