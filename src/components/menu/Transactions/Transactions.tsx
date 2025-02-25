import { Link } from 'react-router-dom'
import {
    ChevronDown,
    CopyPlusIcon,
    ReceiptIcon,
    ShoppingBagIcon,
} from 'lucide-react'

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

export default function TransactionsMenu() {
    return (
        <SidebarMenu>
            <Collapsible defaultOpen className='group/collapsible'>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            className='flex justify-between px-4 py-2 uppercase bg-primary text-primary-foreground hover:bg-primary/80'
                            size='lg'
                            data-testid='menu.transactions'
                        >
                            <p>Transacciones</p>
                            <ChevronDown data-testid='menu.transactions.closed-chevron' />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/transacciones/presupuestos' className='flex gap-1'>
                                    <ShoppingBagIcon size={12} />
                                    <p data-testid='menu.transactions.budget'>Presupuesto</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/transacciones/facturas' className='flex gap-1'>
                                    <ReceiptIcon size={12} />
                                    <p data-testid='menu.transactions.invoices'>Facturas</p>
                                </Link>
                            </SidebarMenuSubItem>

                            <SidebarMenuSubItem className='uppercase text-sm p-3'>
                                <Link to='/transaciones/cierre' className='flex gap-1'>
                                    <CopyPlusIcon size={12} />
                                    <p data-testid='menu.transactions.closure'>Cierre Mensual</p>
                                </Link>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    )
}
