import Reportes from '@/pages/reportes'
import Actual from '@/pages/reportes/actual'
import Balance from '@/pages/reportes/balance'
import Historic from '@/pages/reportes/historic'
import Spent from '@/pages/reportes/spent'
import type { RouteObject } from 'react-router-dom'

export const reportsRoutes: RouteObject = {
  path: 'reportes',
  children: [
    {
      index: true,
      element: <Reportes />,
    },
    {
      path: 'actual',
      element: <Actual />,
    },
    {
      path: 'cuadre',
      element: <Balance />,
    },
    {
      path: 'gastado-por-partida',
      element: <Spent />,
    },
    {
      path: 'historico',
      element: <Historic />,
    },
  ],
}
