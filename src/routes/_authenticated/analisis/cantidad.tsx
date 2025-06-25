import Quantity from '@/pages/analysis/quantity'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analisis/cantidad')({
  component: Quantity,
})
