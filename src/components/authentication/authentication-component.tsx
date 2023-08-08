import { useAppSelector } from '../../store/hooks'
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function Authenticated() {
    const isAuthenticated = useAppSelector(state => state.login.isLoggedIn)
    const location = useLocation()

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
