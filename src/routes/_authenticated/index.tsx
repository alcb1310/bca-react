import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import Home from '~/pages/home/Home'
import { useMeQuery } from '~/queries/user/user'

export const Route = createFileRoute('/_authenticated/')({
  component: Home,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      queryOptions({
        queryKey: ['users', 'me'],
        queryFn: () => useMeQuery(),
      }),
    )
  },
})
