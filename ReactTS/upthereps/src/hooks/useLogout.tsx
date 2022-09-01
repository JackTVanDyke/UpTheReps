import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '../context/GlobalStateProvider'

const useLogout = () => {
  const { setState } = useGlobalState()
  const navigate = useNavigate()

  const logout = () => {
    setState({})
    navigate('/')
  }
  return logout
}

export default useLogout
