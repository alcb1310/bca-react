import { Link } from 'react-router-dom'

import TransactionsMenu from '@/components/menu/Transactions/Transactions'
import ReportsMenu from '@/components/menu/Reports/Reports'
import ParametersMenu from '@/components/menu/Parameters/Parameters'
import AnalysisMenu from '@/components/menu/Analysis/Analysis'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSeparator,
} from '../ui/sidebar'

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center justify-center'>
        <Link to='/'>
          <img src='/favicon.ico' alt='logo' height={50} />
        </Link>
      </SidebarHeader>

      <SidebarSeparator className='mb-3 mt-1' />

      <SidebarContent>
        <TransactionsMenu />
        <ReportsMenu />
        <ParametersMenu />
        <AnalysisMenu />
      </SidebarContent>
    </Sidebar>
  )
}
