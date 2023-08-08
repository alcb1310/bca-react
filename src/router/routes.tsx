import RootLayout from '../routes/root'
import ErrorPage from '../error-page'
import Contact from '../routes/contact'
import { RouteObject } from 'react-router-dom'
import Login from '../pages/login/login-component'
import Authenticated from '../components/authentication/authentication-component'
import { Typography } from '@mui/material'

export const routes: RouteObject[] = [
    {
        element: <Authenticated />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <RootLayout />,
                children: [
                    {
                        path: '/',
                        element: <Typography>Welcome</Typography>

                    },
                    {
                        path: 'contacts/:contactId',
                        element: <Contact />,
                    }
                ]
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]
