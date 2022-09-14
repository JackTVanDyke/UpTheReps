import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface User {
  userId: number | null
  fName: string
  email: string
  role: string
  jwt: string
}

interface UserSliceState {
  user: User
}

const initialState: UserSliceState = {
  user: {
    userId: null,
    fName: '',
    email: '',
    role: '',
    jwt: '',
  },
}

export const userSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUserCredentials: (state, action: PayloadAction<User>) => {
      const {
        payload: { userId, fName, email, role, jwt },
      } = action
      state.user = { userId: userId, fName: fName, email: email, role: role, jwt: jwt }
    },
    logout: (state) => {
      state.user = { userId: null, fName: '', email: '', role: '', jwt: '' }
    },
  },
})

export const { setUserCredentials, logout } = userSlice.actions
export default userSlice.reducer
export const selectCurrentUser = (state: RootState) => state.user.user
