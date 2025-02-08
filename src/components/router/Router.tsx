import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import UnauthenticatedLayout from '~/components/layouts/UnauthenticatedLayout/UnauthenticatedLayout'
import Login from '~/pages/login/Login'
import ValidateAuthentication from '~components/auth/Authentication'
import Home from '~/pages/home/Home'
import AuthenticatedLayout from '~/components/layouts/AuthenticatedLayout/AuthenticatedLayout'
import { analysisRoutes } from './AnalysisRoutes/AnalysisRoutes'
import { parametersRoutes } from './ParametersRoutes/ParametersRoutes'
import { reportsRoutes } from './ReportsRoutes/ReportsRoutes'
import { transactionsRoute } from './TransactionsRoutes/TransactionsRoutes'
import { usersRoutes } from './UsersRoutes/UsersRoutes'

export default function AppRouter() {
    const router = createBrowserRouter([
        {
            element: <ValidateAuthentication />,
            children: [
                { path: '*', element: <div>404 Not found</div> },
                {
                    path: '/',
                    element: <AuthenticatedLayout />,
                    children: [
                        {
                            index: true,
                            element: <Home />,
                        },
                        analysisRoutes,
                        parametersRoutes,
                        reportsRoutes,
                        transactionsRoute,
                        usersRoutes,
                    ],
                },
            ],
        },
        {
            element: <UnauthenticatedLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
