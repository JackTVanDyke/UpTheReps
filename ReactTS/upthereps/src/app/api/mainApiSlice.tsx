import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserCredentials, logout } from '../../features/userSlice'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://upthereps-env.eba-thbpe6zu.us-east-1.elasticbeanstalk.com/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.user.jwt
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
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
      api.dispatch(logout)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})
