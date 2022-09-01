/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios'
import { Auths, instance } from '../api/Api'
import { useGlobalState } from '../context/GlobalStateProvider'

const useRefreshToken = () => {
  const { state, setState } = useGlobalState()

  const refresh = async () => {
    const currJwt: string = JSON.parse(state.jwt as string) as string
    await instance
      .get('/api/users/auth/refresh', {
        headers: {
          Authorization: `Bearer ${currJwt}`,
        },
      })
      .then((response) => {
        const jwt: string = JSON.stringify(response.data.jwt)
        const role: string = JSON.stringify(response.data.role)
        const fName: string = JSON.stringify(response.data.fName)
        const userEmail: string = JSON.stringify(response.data.email)
        const userId: string = JSON.stringify(response.data.userId)
        console.log(response)
        setState({ jwt, role, fName, userEmail, userId })
      })
  }
  return refresh
}

export default useRefreshToken
