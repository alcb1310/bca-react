import Suppliers from '@/pages/parametros/suppliers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/proveedores')({
  component: Suppliers,
})
