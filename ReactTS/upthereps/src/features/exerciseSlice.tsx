import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface Exercise {
  exerciseId: number | null
  name: string
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
    exerciseId: null,
    name: '',
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
        payload: { exerciseId, name, sets, reps, weight, bodyPart },
      } = action
      const newExercise = {
        exerciseId: exerciseId,
        name: name,
        sets: sets,
        reps: reps,
        weight: weight,
        bodyPart: bodyPart,
      }
      state.exercises.push(newExercise)
    },
    removeExercise: (state, action: PayloadAction<number>) => {
      state.exercises = state.exercises.filter(({ exerciseId }) => exerciseId !== action.payload)
    },
    editExercise: (state, action: PayloadAction<Exercise>) => {
      const {
        payload: { exerciseId, name, sets, reps, weight, bodyPart },
      } = action
      state.exercises = state.exercises.map((singleExercise) =>
        singleExercise.exerciseId === exerciseId
          ? { ...singleExercise, name, sets, reps, weight, bodyPart }
          : singleExercise,
      )
    },
    addExerciseList: (state, action: PayloadAction<Exercise[]>) => {
      const num = action.payload.length
      for (let i = 0; i < num; i++) {
        const newExercise = action.payload.at(i) as Exercise
        state.exercises.push(newExercise)
      }
    },
  },
})

export const { addExercise, removeExercise, editExercise, addExerciseList } = exerciseSlice.actions

export const selectExercises = (state: RootState) => state.exercises.exercises

export default exerciseSlice.reducer
