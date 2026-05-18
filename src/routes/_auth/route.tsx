import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/web/app-sidebar";
import { authStore } from "@/store/auth";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: () => {
		const auth = authStore.get();
		if (auth.token === "") {
			throw redirect({ to: "/login" });
		}
	},
});

function RouteComponent() {
	return (
		<div>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<h1 className="text-xl font-bold text-primary/80 uppercase tracking-wide">
							Sistema Control Presupuestario
						</h1>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4">
						<Outlet />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
