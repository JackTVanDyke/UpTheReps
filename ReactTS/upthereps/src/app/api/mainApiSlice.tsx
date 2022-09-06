import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserCredentials, logOut } from '../../features/userSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.user.jwt
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: { shout?: boolean },
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('api/users/auth/refresh', api, extraOptions)
    if (refreshResult?.data) {
      const user = api.getState() as RootState['user']['user']
      user.jwt = refreshResult?.data as string
      api.dispatch(setUserCredentials(user))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
