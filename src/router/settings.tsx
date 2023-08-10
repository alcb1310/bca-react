import { RouteObject } from "react-router-dom";
import Suppliers from "../pages/settings/suppliers/suppliers.component";

export const settings: RouteObject[] = [
    {
        path: "suppliers",
        element: <Suppliers />
    },
    {
        path: "budget-items",
        element: <p>Partidas</p>
    },
    {
        path: "projects",
        element: <p>Proyectos</p>
    },

]
