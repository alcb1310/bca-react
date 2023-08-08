import Root from '../routes/root'
import ErrorPage from '../error-page'
import Contact from '../routes/contact'
import { RouteObject } from 'react-router-dom'
import Login from '../pages/login/login-component'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contact />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]
