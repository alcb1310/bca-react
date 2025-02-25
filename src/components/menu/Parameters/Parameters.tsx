import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
    BrickWallIcon,
    ChartColumnStackedIcon,
    ChevronDown,
    FolderGit2Icon,
    LayoutListIcon,
    ListChecksIcon,
    SquareUserRoundIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ParametersMenu() {
    return (
        <SidebarMenu>
            <Collapsible defaultOpen className='group/collapsible'>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            className='flex justify-between px-4 py-2 uppercase bg-primary text-primary-foreground hover:bg-primary/80'
                            size='lg'
                        >
                            <p data-testid='menu.parameters'>Parametros</p>
                            <ChevronDown data-testid='menu.parameters.closed-chevron' />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/partidas' className='flex gap-1'>
                                    <ListChecksIcon size={12} />
                                    <p data-testid='menu.parameters.budget-items'>Partidas</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/categorias' className='flex gap-1'>
                                    <ChartColumnStackedIcon size={12} />
                                    <p data-testid='menu.parameters.categories'>Categorias</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/materiales' className='flex gap-1'>
                                    <BrickWallIcon size={12} />
                                    <p data-testid='menu.parameters.materials'>Materiales</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/proyectos' className='flex gap-1'>
                                    <FolderGit2Icon size={12} />
                                    <p data-testid='menu.parameters.projects'>Proyectos</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/proveedores' className='flex gap-1'>
                                    <SquareUserRoundIcon size={12} />
                                    <p data-testid='menu.parameters.suppliers'>Proveedores</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/parametros/rubros' className='flex gap-1'>
                                    <LayoutListIcon size={12} />
                                    <p data-testid='menu.parameters.items'>Rubros</p>
                                </Link>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    )
}
