import Spent from '@/pages/reportes/spent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/reportes/gastado-por-partida',
)({
  component: Spent,
})
