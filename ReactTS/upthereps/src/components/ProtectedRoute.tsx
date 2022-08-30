import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useGlobalState } from '../context/GlobalStateProvider'

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string }) => {
  const location = useLocation()
  const { state } = useGlobalState()

  return allowedRoles.includes(state?.role as string) ? (
    <Outlet />
  ) : state?.role === 'USER' ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute
