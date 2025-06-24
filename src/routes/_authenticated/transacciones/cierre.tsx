import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transacciones/cierre')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/transacciones/cierre"!</div>
}
