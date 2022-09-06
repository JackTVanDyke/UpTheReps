import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface Exercise {
  id: number | null
  exercise: string
  sets: string
  reps: string
  weight: string
  bodyPart: string
}

interface ExerciseSliceState {
  exercises: Exercise[]
  exercise: Exercise
}

const initialState: ExerciseSliceState = {
  exercises: [],
  exercise: {
    id: null,
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    bodyPart: '',
  },
}

export const exerciseSlice = createSlice({
  name: 'Exercises',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      const {
        payload: { exercise, sets, reps, weight, bodyPart },
      } = action
      const newExercise = {
        id: state.exercises.length + 1,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        bodyPart: bodyPart,
      }
      state.exercises.push(newExercise)
    },
    removeExercise: (state, action: PayloadAction<number>) => {
      state.exercises = state.exercises.filter(({ id }) => id !== action.payload)
    },
    editExercise: (state, action: PayloadAction<Exercise>) => {
      const {
        payload: { id, exercise, sets, reps, weight, bodyPart },
      } = action
      state.exercises = state.exercises.map((singleExercise) =>
        singleExercise.id === id
          ? { ...singleExercise, exercise, sets, reps, weight, bodyPart }
          : singleExercise,
      )
    },
  },
})

export const { addExercise, removeExercise, editExercise } = exerciseSlice.actions

export const selectExercises = (state: RootState) => state.exercises.exercises

export default exerciseSlice.reducer
