import Factura from '@/pages/transacciones/factura'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transacciones/facturas/')(
  {
    component: Factura,
  },
)
