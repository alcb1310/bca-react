import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/perfil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/usuarios/perfil"!</div>
}
