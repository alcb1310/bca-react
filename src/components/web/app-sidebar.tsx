import { ComponentProps, ForwardRefExoticComponent, RefAttributes } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import type { FileRoutesByTo } from '@/routeTree.gen'
import { BanknoteArrowDownIcon, BrickWallIcon, CableIcon, ChartBarStackedIcon, ChartCandlestickIcon, ChartSplineIcon, ChevronRight, ClipboardClockIcon, CreditCardIcon, FolderKanbanIcon, FolderOpenIcon, LayoutListIcon, LucideProps, ScaleIcon, ShellIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react";

type NavData = {
    title: string;
    icon?: string
    items: {
        title: string;
        path: keyof FileRoutesByTo;
        icon?: ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
        >
    }[];
}

const data: { navMain: NavData[] } = {
    navMain: [
        {
            title: 'Transacciones',
            items: [
                {
                    title: 'Presupuesto',
                    path: '/transacciones/presupuesto',
                    icon: ShoppingCartIcon
                },
                {
                    title: 'Facturas',
                    path: '/transacciones/facturas',
                    icon: CreditCardIcon
                },
                {
                    title: 'Cierre mensual',
                    path: '/transacciones/cierre-mensual',
                    icon: ChartCandlestickIcon
                }
            ]
        },
        {
            title: 'Reportes',
            items: [
                {
                    title: 'Actual',
                    path: '/reportes/actual',
                    icon: FolderOpenIcon
                },
                {
                    title: 'Cuadre',
                    path: '/reportes/cuadre',
                    icon: ScaleIcon
                },
                {
                    title: 'Gastado por Partida',
                    path: '/reportes/gastado-por-partida',
                    icon: BanknoteArrowDownIcon,
                },
                {
                    title: 'Histórico',
                    path: '/reportes/historico',
                    icon: ClipboardClockIcon
                },
            ],
        },
        {
            title: 'Parámetros',
            items: [
                {
                    title: 'Partidas',
                    path: '/parametros/partidas',
                    icon: LayoutListIcon,
                },
                {
                    title: 'Categorias',
                    path: '/parametros/categorias',
                    icon: ChartBarStackedIcon,
                },
                {
                    title: 'Materiales',
                    path: '/parametros/materiales',
                    icon: BrickWallIcon,
                },
                {
                    title: 'Proyectos',
                    path: '/parametros/proyectos',
                    icon: FolderKanbanIcon,
                },
                {
                    title: 'Proveedores',
                    path: '/parametros/proveedores',
                    icon: CableIcon,
                },
                {
                    title: 'Rubros',
                    path: '/parametros/rubros',
                    icon: ShoppingBasketIcon,
                },
            ],
        },
        {
            title: 'Analisis',
            items: [
                {
                    title: 'Cantidades',
                    path: '/analisis/cantidades',
                    icon: ShellIcon
                },
                {
                    title: 'Analisis',
                    path: '/analisis/analisis',
                    icon: ChartSplineIcon
                },
            ],
        },

    ]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
    return <Sidebar {...props}>
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size='lg' asChild>
                        <Link to='/'>
                            <p className='w-full text-primary text-center text-xl'>
                                BCA
                            </p>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {data.navMain.map((items) => (
                        <Collapsible key={items.title} asChild className='group/collapsible' defaultOpen={true}>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={items.title}>
                                        {items.icon && <items.icon />}
                                        <span>{items.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {items.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link to={subItem.path}>
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}
