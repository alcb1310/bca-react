import { RouteObject } from "react-router-dom";

export const transactions: RouteObject[] = [
    {
        path: "budget",
        element: <p>Presupuesto</p>
    },
    {
        path: "invoices",
        element: <p>Facturas</p>
    },
    {
        path: "closure",
        element: <p>Cierre mensual</p>
    },
]
