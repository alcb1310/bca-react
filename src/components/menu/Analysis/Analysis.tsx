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
import { ChartNetworkIcon, ChevronDown, ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnalysisMenu() {
  return (
    <SidebarMenu>
      <Collapsible defaultOpen className='group/collapsible'>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className='flex justify-between bg-primary px-4 py-2 uppercase text-primary-foreground hover:bg-primary/80'
              size='lg'
            >
              <p data-testid='menu.analysis'>Analisis</p>
              <ChevronDown data-testid='menu.analysis.closed-chevron' />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/analisis/cantidad' className='flex gap-1'>
                  <ShoppingCartIcon size={12} />
                  <p data-testid='menu.analysis.quantities'>Cantidades</p>
                </Link>
              </SidebarMenuSubItem>

              <SidebarMenuSubItem className='p-3 text-sm uppercase'>
                <Link to='/analisis/analisis' className='flex gap-1'>
                  <ChartNetworkIcon size={12} />
                  <p data-testid='menu.analysis.analysis'>Analisis</p>
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
