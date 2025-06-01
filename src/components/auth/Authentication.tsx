import { useStore } from '@tanstack/react-store'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { loginStore } from '~/store/login'

export default function ValidateAuthentication() {
  const location = useLocation()
  const isAuthenticated = useStore(loginStore, (state) => state.isloggedIn)

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}
