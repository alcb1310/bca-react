import UsersHome from '@/pages/users'
import Admin from '@/pages/users/admin'
import type { RouteObject } from 'react-router-dom'

export const usersRoutes: RouteObject = {
  path: 'usuarios',
  children: [
    {
      index: true,
      element: <UsersHome />,
    },
    {
      path: 'admin',
      element: <Admin />,
    },
  ],
}
