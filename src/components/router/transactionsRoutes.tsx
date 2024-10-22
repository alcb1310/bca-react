import { RouteObject } from 'react-router-dom'
import Transacciones from '../../pages/transacciones'
import Presupuesto from '../../pages/transacciones/presupuesto'
import Factura from '../../pages/transacciones/factura'
import IndividualInvoice from '../../pages/transacciones/factura/detail'
import Cierre from '../../pages/transacciones/cierre'

export const transactionsRoute: RouteObject = {
  path: 'transacciones',
  children: [
    {
      index: true,
      element: <Transacciones />,
    },
    {
      path: 'presupuestos',
      element: <Presupuesto />,
    },
    {
      path: 'facturas',
      children: [
        {
          index: true,
          element: <Factura />,
        },
        {
          path: ':invoiceId',
          element: <IndividualInvoice />,
        },
      ],
    },
    {
      path: 'cierre',
      element: <Cierre />,
    },
  ],
}
