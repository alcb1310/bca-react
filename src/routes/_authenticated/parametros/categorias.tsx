import Categories from '@/pages/parametros/categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/categorias')({
  component: Categories,
})
