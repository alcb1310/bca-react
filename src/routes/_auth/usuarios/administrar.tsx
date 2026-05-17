import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/administrar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/usuarios/administrar"!</div>
}
