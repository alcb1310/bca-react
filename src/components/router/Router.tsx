import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout"
import Login from "../../pages/login/login"
import ValidateAuthentication from "../auth/Authentication"
import Home from "../../pages/home/Home"
import AuthenticatedLayout from "../layouts/AuthenticatedLayout"
import { analysisRoutes } from "./analysisRoutes"
import { parametersRoutes } from "./parametersRoutes"
import { reportsRoutes } from "./reportsRoutes"
import { transactionsRoute } from "./transactionsRoutes"
import { usersRoutes } from "./usersRoutes"

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <ValidateAuthentication />,
      children: [
        { path: "*", element: <div>404 Not found</div> },
        {
          path: "/",
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
          ]
        },
      ]
    },
    {
      element: <UnauthenticatedLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
