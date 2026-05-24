import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { deleteCookie } from '@tanstack/react-start/server'
import { ChevronsUpDown, LogOutIcon, type LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Me } from '@/queries/users'
import type { FileRoutesByTo } from '@/routeTree.gen'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { UserChangePasswordDialog } from './user-drawer'

export type UserData = {
	name?: string
	email?: string
	options: {
		title: string
		path: keyof FileRoutesByTo
		icon?: ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
		>
	}[]
}

type NavUserProps = {
	user: UserData
}

const logout = createServerFn({ method: 'POST' }).handler(async () => {
	deleteCookie('BCA-TOKEN')
})

export function NavUser({ user }: NavUserProps) {
	const navigate = useNavigate()
	const { data } = useQuery({
		queryKey: ['me'],
		queryFn: () => Me(),
	})

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-primary text-primary-foreground/80'>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate text-xs font-medium'>
									{data?.name}
								</span>
								<span className='truncate text-xs font-extralight'>
									{data?.email}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side='right'
						align='end'
						sideOffset={4}
					>
						<DropdownMenuGroup>
							{user.options.map((option) => {
								return (
									<DropdownMenuItem
										key={option.title}
										onClick={() => navigate({ to: option.path })}
									>
										{option.icon && <option.icon />}
										<span>{option.title}</span>
									</DropdownMenuItem>
								)
							})}

							<UserChangePasswordDialog />
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={async () => {
								await logout()
								navigate({ to: '/login' })
							}}
						>
							<LogOutIcon />
							Cerrar Session
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
