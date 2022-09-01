import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useGlobalState } from '../context/GlobalStateProvider'

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string }) => {
  const location = useLocation()
  const { state } = useGlobalState()
  const userRole: string = JSON.parse(state?.role as string) as string
  const accessToken: string = JSON.parse(state?.jwt as string) as string

  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute
