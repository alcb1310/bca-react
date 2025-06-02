import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transacciones/facturas/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/transacciones/facturas/$id"!</div>
}
