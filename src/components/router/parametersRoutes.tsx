import { RouteObject } from 'react-router-dom'
import Parameters from '../../pages/parametros'
import BudgetItems from '../../pages/parametros/budget-items'
import Categories from '../../pages/parametros/categories'
import Items from '../../pages/parametros/items'
import Materials from '../../pages/parametros/materials'
import Projects from '../../pages/parametros/projects'
import Suppliers from '../../pages/parametros/suppliers'

export const parametersRoutes: RouteObject = {
  path: 'parametros',
  children: [
    {
      index: true,
      element: <Parameters />,
    },
    {
      path: 'partidas',
      element: <BudgetItems />,
    },
    {
      path: 'categorias',
      element: <Categories />,
    },
    {
      path: 'materiales',
      element: <Materials />,
    },
    {
      path: 'proveedores',
      element: <Suppliers />,
    },
    {
      path: 'proyectos',
      element: <Projects />,
    },
    {
      path: 'rubros',
      element: <Items />,
    },
  ],
}
