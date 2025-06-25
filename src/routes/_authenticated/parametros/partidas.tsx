import BudgetItems from '@/pages/parametros/budget-items'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/partidas')({
  component: BudgetItems,
})
