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
  ChevronDown,
  DollarSignIcon,
  FileClockIcon,
  FileIcon,
  ScaleIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ReportsMenu() {
  return (
    <SidebarMenu>
      <Collapsible defaultOpen className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className='flex justify-between bg-primary px-4 py-2 uppercase text-primary-foreground hover:bg-primary/80'
              size='lg'
            >
              <p data-testid='menu.reports'>Reportes</p>
              <ChevronDown data-testid='menu.reports.closed-chevron' />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/reportes/actual' className='flex gap-1'>
                  <FileIcon size={12} />
                  <p data-testid='menu.reports.actual'>Actual</p>
                </Link>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/reportes/cuadre' className='flex gap-1'>
                  <ScaleIcon size={12} />
                  <p data-testid='menu.reports.balance'>Cuadre</p>
                </Link>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/reportes/gastado-por-partida' className='flex gap-1'>
                  <DollarSignIcon size={12} />
                  <p data-testid='menu.reports.spent'>Gastado por Partida</p>
                </Link>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/reportes/historico' className='flex gap-1'>
                  <FileClockIcon size={12} />
                  <p data-testid='menu.reports.historic'>Historico</p>
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
