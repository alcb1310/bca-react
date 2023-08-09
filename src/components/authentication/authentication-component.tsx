import { useValidateQuery } from '../../api/login/bca-api-slice'
import { useAppDispatch } from '../../store/hooks'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { logIn, logOut } from '../../store/login/loginSlice'

export default function Authenticated() {
    const validate = useValidateQuery(undefined)
    const location = useLocation()
    const dispatch = useAppDispatch()

    // TODO: change the console log
    if (validate.isError) {
        dispatch(logOut())
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (validate.isSuccess) {
        dispatch(logIn(validate.data.jwt))
        return <Outlet />
    }
}
