import Balance from '@/pages/reportes/balance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/cuadre')({
  component: Balance,
})
