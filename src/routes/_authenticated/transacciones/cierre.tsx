import Cierre from '@/pages/transacciones/cierre'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transacciones/cierre')({
  component: Cierre,
})
