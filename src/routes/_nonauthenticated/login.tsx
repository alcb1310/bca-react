import Login from '@/pages/login/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonauthenticated/login')({
  component: Login,
})
