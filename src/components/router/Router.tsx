import { createBrowserRouter, RouterProvider } from "react-router-dom"
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout"
import Login from "../../pages/login/login"

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      element: <UnauthenticatedLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
