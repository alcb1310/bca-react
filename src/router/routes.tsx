import RootLayout from '../routes/root'
import { RouteObject } from 'react-router-dom'
import Login from '../pages/login/login-component'
import Authenticated from '../components/authentication/authentication-component'
import { transactions } from './transactions'
import { reports } from './reports'
import { settings } from './settings'
import { users } from './users'
import LandingPage from '../pages/landing/landing.component'

export const routes: RouteObject[] = [
    {
        element: <Authenticated />,
        children: [
            {
                element: <RootLayout />,
                children: [
                    {
                        path: '/',
                        element: <LandingPage />

                    },
                    {
                        path: "reports",
                        children: reports
                    },
                    {
                        path: "settings",
                        children: settings
                    },
                    {
                        path: "transactions",
                        children: transactions
                    },
                    {
                        path: "users",
                        children: users
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]
