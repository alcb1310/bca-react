import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/web/app-sidebar'
import { authStore } from '@/store/auth'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { useEffect } from 'react'

export const readCookieFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const cookieValue = getCookie('BCA-TOKEN')

		if (cookieValue) {
			authStore.state.token = cookieValue || ''
		}
		return { cookieValue }
	},
)

export const Route = createFileRoute('/_auth')({
	component: RouteComponent,
	beforeLoad: async () => {
		const token = authStore.state.token
		if (!token) {
			const cookie = await readCookieFn()
			return { token: cookie.cookieValue }
		}
		return { token }
	},
	loader: ({ context }) => {
		const auth = authStore.get()
		if (auth.token === '' || context.token === '') {
			throw redirect({ to: '/login' })
		}

		if (context.token) {
			return { token: context.token }
		}

		return { token: auth.token }
	},
})

function RouteComponent() {
	const { token } = Route.useLoaderData()
	useEffect(() => {
		authStore.setState((state) => ({
			...state,
			token,
		}))
	}, [token])

	return (
		<div>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator
							orientation='vertical'
							className='mr-2 data-[orientation=vertical]:h-4'
						/>
						<h1 className='text-xl font-bold text-primary/80 uppercase tracking-wide'>
							Sistema Control Presupuestario
						</h1>
					</header>
					<div className='flex flex-1 flex-col gap-4 p-4'>
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
