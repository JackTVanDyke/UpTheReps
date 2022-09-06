import { configureStore } from '@reduxjs/toolkit'
import { exerciseSlice } from '../features/exerciseSlice'
import { userSlice } from '../features/userSlice'
import { workoutSlice } from '../features/workoutSlice'
import { apiSlice } from './api/mainApiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    exercises: exerciseSlice.reducer,
    workouts: workoutSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
