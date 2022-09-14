import { apiSlice } from '../app/api/mainApiSlice'
import { Exercise } from './exerciseSlice'

export const exerciseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<Exercise[], number>({
      query: (userId: number) => ({
        url: `api/exercises/user/${userId}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),
    saveExercise: builder.mutation({
      query: (newExercise: {
        name: string
        sets: number
        reps: number
        weight: number
        bodyPart: string
        userId: number
      }) => ({
        url: `api/exercises/${newExercise.userId}/save`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: { ...newExercise },
      }),
    }),
    updateExercise: builder.mutation({
      query: (updatedExercise: {
        exerciseId: number
        name: string
        sets: number
        reps: number
        weight: number
        bodyPart: string
        userId: number
      }) => ({
        url: `api/exercises/update/${updatedExercise.userId}/${updatedExercise.exerciseId}`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: {
          name: updatedExercise.name,
          sets: updatedExercise.sets,
          reps: updatedExercise.reps,
          weight: updatedExercise.weight,
          bodyPart: updatedExercise.bodyPart,
          userId: updatedExercise.userId,
        },
      }),
    }),
    deleteExercise: builder.mutation({
      query: (exerciseToDelete: {
        exerciseId: number
        name: string
        sets: number
        reps: number
        weight: number
        bodyPart: string
        userId: number
      }) => ({
        url: `api/exercises/delete/${exerciseToDelete.userId}/${exerciseToDelete.exerciseId}`,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: { ...exerciseToDelete },
      }),
    }),
  }),
})

export const {
  useGetExercisesQuery,
  useSaveExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = exerciseApiSlice
