import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { Exercise } from './exerciseSlice'

export interface Workout {
  workoutId: number | null
  name: string
  date: string
  exerciseList: Exercise[]
}

interface WorkoutSliceState {
  workouts: Workout[]
  workout: Workout
}

const initialState: WorkoutSliceState = {
  workouts: [],
  workout: {
    workoutId: null,
    name: '',
    date: new Date().getDate().toString(),
    exerciseList: [],
  },
}

export const workoutSlice = createSlice({
  name: 'Workouts',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<Workout>) => {
      const {
        payload: { workoutId, name, date, exerciseList },
      } = action
      const newWorkout = {
        workoutId: workoutId,
        name: name,
        date: date,
        exerciseList: exerciseList,
      }
      state.workouts.push(newWorkout)
    },
    removeWorkout: (state, action: PayloadAction<number>) => {
      state.workouts = state.workouts.filter(({ workoutId }) => workoutId !== action.payload)
    },
    editWorkout: (state, action: PayloadAction<Workout>) => {
      const {
        payload: { workoutId, name, date, exerciseList },
      } = action
      state.workouts = state.workouts.map((singleWorkout) =>
        singleWorkout.workoutId === workoutId
          ? { ...singleWorkout, name, date, exerciseList }
          : singleWorkout,
      )
    },
    addWorkoutList: (state, action: PayloadAction<Workout[]>) => {
      const num = action.payload.length
      for (let i = 0; i < num; i++) {
        const newWorkout = action.payload.at(i) as Workout
        state.workouts.push(newWorkout)
      }
    },
  },
})

export const { addWorkout, editWorkout, removeWorkout, addWorkoutList } = workoutSlice.actions
export const selectWorkouts = (state: RootState) => state.workouts.workouts
export default workoutSlice.reducer
