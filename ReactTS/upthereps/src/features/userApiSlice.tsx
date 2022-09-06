import { apiSlice } from '../app/api/mainApiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials: { email: string; password: string }) => ({
        url: 'api/users/auth/login',
        method: 'POST',
        body: { ...userCredentials },
      }),
    }),
  }),
})

export const { useLoginMutation } = userApiSlice
