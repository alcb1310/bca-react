import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Admin from '~/pages/users/admin'
import { useGetAllUsersQuery, useMeQuery } from '~/queries/user/user'

export const Route = createFileRoute('/_authenticated/usuarios/admin')({
  component: Admin,
  loader: async ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData(
        queryOptions({
          queryKey: ['users', 'me'],
          queryFn: () => useMeQuery(),
        }),
      ),
      queryClient.ensureQueryData(
        queryOptions({
          queryKey: ['users'],
          queryFn: () => useGetAllUsersQuery(),
        }),
      ),
    ])
  },
})
