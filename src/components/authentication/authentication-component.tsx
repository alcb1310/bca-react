import { useCookies } from 'react-cookie'
import { useValidateQuery } from '../../api/login/bca-api-slice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { logOut } from '../../store/login/loginSlice'

export default function Authenticated() {
    const isAuthenticated = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const [cookies, setCookie] = useCookies(["BCAAuth"])
    const validate = useValidateQuery(1)
    const location = useLocation()
    // console.log(cookies)

    if (!validate.isLoading) {
        if (validate.isError) {
            dispatch(logOut())
            return <Navigate to="/login" state={{ from: location }} replace />
        }
        let savedJWT = cookies.BCAAuth
        console.log(savedJWT)

        if (validate.data?.jwt !== cookies.BCAAuth) {
            savedJWT = validate.data?.jwt ? validate.data.jwt : ""
            setCookie("BCAAuth", savedJWT)
        }

    }
    console.log(isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
