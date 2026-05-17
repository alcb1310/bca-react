import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/reportes/cuadre')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/reportes/cuadre"!</div>
}
