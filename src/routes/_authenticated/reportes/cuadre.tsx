import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reportes/cuadre')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reportes/cuadre"!</div>
}
