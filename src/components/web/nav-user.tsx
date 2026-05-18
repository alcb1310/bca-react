import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown, LogOutIcon, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, JSX, RefAttributes } from "react";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { authStore } from "@/store/auth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { UserChangePasswordDialog } from "./user-drawer";

export type UserData = {
	name?: string;
	email?: string;
	options: {
		title: string;
		path: keyof FileRoutesByTo;
		icon?: ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		>;
	}[];
};

type NavUserProps = {
	user: UserData;
};

export function NavUser({ user }: NavUserProps) {
	const navigate = useNavigate();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size={"lg"}
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-primary text-primary-foreground/80"
						>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate text-lg font-medium">
									{user.name}
								</span>
								<span className="truncate text-xs font-extralight">
									{user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side="right"
						align="end"
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
								);
							})}

							<UserChangePasswordDialog />
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								authStore.setState((state) => ({
									...state,
									user: null,
									token: "",
								}));
								navigate({ to: "/login" });
							}}
						>
							<LogOutIcon />
							Cerrar Session
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
