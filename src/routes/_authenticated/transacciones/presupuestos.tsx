import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transacciones/presupuestos',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/transacciones/presupuestos"!</div>
}
