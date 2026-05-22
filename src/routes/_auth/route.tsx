import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/web/app-sidebar'

export const readCookieFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const cookieValue = getCookie('BCA-TOKEN')

		if (!cookieValue) {
			return { cookieValue: null }
		}
		return { cookieValue }
	},
)

export const Route = createFileRoute('/_auth')({
	component: RouteComponent,
	loader: async () => {
		const token = await readCookieFn()
		if (token.cookieValue === null) {
			throw redirect({ to: '/login' })
		}

		return { token: token.cookieValue }
	},
})

function RouteComponent() {
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
