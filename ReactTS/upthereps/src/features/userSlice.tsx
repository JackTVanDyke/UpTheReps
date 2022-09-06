import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

export interface User {
  userId: number | null
  fName: string
  userEmail: string
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
    userEmail: '',
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
        payload: { userId, fName, userEmail, role, jwt },
      } = action
      state.user = { userId: userId, fName: fName, userEmail: userEmail, role: role, jwt: jwt }
    },
    logOut: (state) => {
      state.user = { userId: null, fName: '', userEmail: '', role: '', jwt: '' }
    },
  },
})

export const { setUserCredentials, logOut } = userSlice.actions
export default userSlice.reducer
export const selectCurrentUser = (state: RootState) => state.user.user
