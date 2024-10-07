import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ValidateAuthentication(){
  const isAuthenticated = true
  const location = useLocation()

  return isAuthenticated ?
    <Outlet /> :
    <Navigate to="/login" state={{ from: location }} replace />
}
