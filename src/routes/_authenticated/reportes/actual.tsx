import Actual from '@/pages/reportes/actual'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/actual')({
  component: Actual,
})
