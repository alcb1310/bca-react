import { RouteObject } from "react-router-dom";

export const reports: RouteObject[] = [
    {
        path: "actual",
        element: <p>Actual</p>
    },
    {
        path: "balance",
        element: <p>Cuadre</p>
    },
    {
        path: "historic",
        element: <p>Historico</p>
    },
    {
        path: "spend-by-item",
        element: <p>Gastado por partida</p>
    },
]
