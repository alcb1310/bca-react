import { createFileRoute } from '@tanstack/react-router'
import Factura from '~/pages/transacciones/factura'

export const Route = createFileRoute('/_authenticated/transacciones/facturas/')(
  {
    component: Factura,
  },
)
