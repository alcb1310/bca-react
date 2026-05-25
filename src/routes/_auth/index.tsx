// src/routes/index.tsx

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Me } from '@/queries/users'
export const Route = createFileRoute('/_auth/')({
	component: Home,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['me'],
			queryFn: () => Me(),
		})
	},
})

function Home() {
	const { data: user } = useSuspenseQuery({
		queryKey: ['me'],
		queryFn: () => Me(),
	})
	return (
		<p>
			Bienvenido <span className='font-bold'>{user.name}</span>
		</p>
	)
}
