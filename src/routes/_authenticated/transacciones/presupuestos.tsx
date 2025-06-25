import Presupuesto from '@/pages/transacciones/presupuesto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transacciones/presupuestos',
)({
  component: Presupuesto,
})
