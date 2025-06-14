import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Login from '../../pages/login/Login'
import ValidateAuthentication from '../auth/Authentication'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout'
import { analysisRoutes } from './analysisRoutes'
import { parametersRoutes } from './parametersRoutes'
import { reportsRoutes } from './reportsRoutes'
import { transactionsRoute } from './transactionsRoutes'
import { usersRoutes } from './usersRoutes'

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
