/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

interface NewUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

const UserRequests = {
  post: (url: string, body: NewUserRequest) =>
    instance.post<NewUserRequest>(url, body).then((response) => {
      return response.data
    }),
}

export const Users = {
  registerUser: (user: NewUserRequest): Promise<NewUserRequest> =>
    UserRequests.post('/api/users/register', user),
}

const AuthRequests = {
  post: (url: string, body: any) =>
    instance.post<any>(url, body).then((response: AxiosResponse<any>) => {
      return response.data
    }),
}

export const Auths = {
  login: (authRequest: any): Promise<any> => AuthRequests.post('api/users/auth/login', authRequest),
}
