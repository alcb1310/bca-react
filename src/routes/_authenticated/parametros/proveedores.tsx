import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros/proveedores')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/parametros/porveedores"!</div>
}
