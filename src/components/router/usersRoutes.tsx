import { RouteObject } from "react-router-dom";
import UsersHome from "../../pages/users";
import Admin from "../../pages/users/admin";
import ChangePassword from "../../pages/users/password";

export const usersRoutes: RouteObject = {
  path: 'usuarios',
  children: [
    {
      index: true,
      element: <UsersHome />
    },
    {
      path: 'admin',
      element: <Admin />
    },
    {
      path: 'contrasena',
      element: <ChangePassword />
    },
  ]
}
