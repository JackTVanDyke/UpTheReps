import { apiSlice } from '../app/api/mainApiSlice'
import { Workout } from './workoutSlice'
import { Exercise } from './exerciseSlice'

export const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveWorkout: builder.mutation({
      query: (newWorkout: { user: number; name: string; date: string; exerciseIds: number[] }) => ({
        url: `api/workouts/${newWorkout.user}/save`,
        method: 'POST',
        body: { ...newWorkout },
      }),
    }),
    getWorkouts: builder.query<Workout[], number>({
      query: (userId: number) => ({
        url: `api/workouts/user/${userId}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),
    updateWorkout: builder.mutation({
      query: (updatedWorkout: {
        workoutId: number
        name: string
        date: string
        exerciseIds: number[]
        user: number
      }) => ({
        url: `api/workouts/update/${updatedWorkout.user}/${updatedWorkout.workoutId}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          name: updatedWorkout.name,
          date: updatedWorkout.name,
          exerciseIds: updatedWorkout.exerciseIds,
          user: updatedWorkout.user,
        },
      }),
    }),
    deleteWorkout: builder.mutation({
      query: (workoutToDelete: {
        workoutId: number
        name: string
        date: string
        exerciseList: Exercise[]
        user: number
      }) => ({
        url: `api/workouts/delete/${workoutToDelete.user}/${workoutToDelete.workoutId}`,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          ...workoutToDelete,
        },
      }),
    }),
  }),
})

export const {
  useSaveWorkoutMutation,
  useGetWorkoutsQuery,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
} = workoutApiSlice
