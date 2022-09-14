import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/userSlice'

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string }) => {
  const location = useLocation()
  const user = useSelector(selectCurrentUser)

  return user.jwt ? (
    allowedRoles.includes(user.role) ? (
      <Outlet />
    ) : (
      <Navigate to='/unauthorized' state={{ from: location }} replace />
    )
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute
