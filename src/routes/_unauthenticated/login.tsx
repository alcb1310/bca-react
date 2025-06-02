import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import Login from '~/pages/login/Login'

export const Route = createFileRoute('/_unauthenticated/login')({
  component: Login,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
})
