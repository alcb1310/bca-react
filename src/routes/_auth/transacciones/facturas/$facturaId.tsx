import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/transacciones/facturas/$facturaId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/transacciones/facturas/$facturaId"!</div>
}
