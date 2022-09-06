import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { Exercise } from './exerciseSlice'

interface Workout {
  id: number | null
  workout: string
  date: string
  exercises: Exercise[]
}

interface WorkoutSliceState {
  workouts: Workout[]
  workout: Workout
}

const initialState: WorkoutSliceState = {
  workouts: [],
  workout: {
    id: null,
    workout: '',
    date: new Date().getDate().toString(),
    exercises: [],
  },
}

export const workoutSlice = createSlice({
  name: 'Workouts',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      const {
        payload: { id, workout, date, exercises },
      } = action
      const newWorkout = {
        id: id,
        workout: workout,
        date: date,
        exercises: exercises,
      }
      state.workouts.push(newWorkout)
    },
    removeWorkout: (state, action: PayloadAction<number>) => {
      state.workouts = state.workouts.filter(({ id }) => id !== action.payload)
    },
    editWorkout: (state, action: PayloadAction<Workout>) => {
      const {
        payload: { id, workout, date, exercises },
      } = action
      state.workouts = state.workouts.map((singleWorkout) =>
        singleWorkout.id === id ? { ...singleWorkout, workout, date, exercises } : singleWorkout,
      )
    },
  },
})

export const { addWorkout, editWorkout, removeWorkout } = workoutSlice.actions
export const selectWorkouts = (state: RootState) => state.workouts.workouts
export default workoutSlice.reducer
