import { useCookies } from 'react-cookie'
import { useValidateQuery } from '../../api/login/bca-api-slice'
import { useAppSelector } from '../../store/hooks'
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function Authenticated() {
    const isAuthenticated = useAppSelector(state => state.login.isLoggedIn)
    const [cookies, setCookie] = useCookies(["BCAAuth"])
    const validate = useValidateQuery(1)
    const location = useLocation()

    // TODO: change the console log
    if (!validate.isLoading) {
        if (validate.isError) {
            console.log({ validate })
        }
        let savedJWT = cookies.BCAAuth

        if (validate.data?.jwt !== cookies.BCAAuth) {
            savedJWT = validate.data?.jwt ? validate.data.jwt : ""
            setCookie("BCAAuth", savedJWT)
        }

    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
