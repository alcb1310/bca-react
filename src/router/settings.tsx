import Suppliers from "@/pages/settings/suppliers/suppliers.component";
import { RouteObject } from "react-router-dom";

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
