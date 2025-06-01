import { createFileRoute } from '@tanstack/react-router'
import Login from '~/pages/login/Login'

export const Route = createFileRoute('/_unauthenticated/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Login />
}
