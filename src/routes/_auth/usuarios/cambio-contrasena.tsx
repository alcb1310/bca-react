import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/usuarios/cambio-contrasena')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/usuarios/cambio-contrasena"!</div>
}
