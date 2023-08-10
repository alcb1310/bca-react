import { useValidateQuery } from '../../api/login/bca-api-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { logIn, logOut } from '../../store/login/loginSlice'

export default function Authenticated() {
    const jwtToken = useAppSelector(state => state.login.jwt)
    const validate = useValidateQuery({
        jwt: jwtToken
    })
    const location = useLocation()
    const dispatch = useAppDispatch()

    if (validate.isError) {
        dispatch(logOut())
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (validate.isSuccess) {
        dispatch(logIn(validate.data.jwt))
        return <Outlet />
    }
}
