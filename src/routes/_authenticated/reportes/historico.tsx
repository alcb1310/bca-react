import Historic from '@/pages/reportes/historic'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/historico')({
  component: Historic,
})
