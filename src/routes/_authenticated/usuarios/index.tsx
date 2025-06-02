import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import UsersHome from '~/pages/users'
import { useMeQuery } from '~/queries/user/user'

export const Route = createFileRoute('/_authenticated/usuarios/')({
  component: UsersHome,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ['users', 'me'],
        queryFn: () => useMeQuery(),
      }),
    )
  },
})
