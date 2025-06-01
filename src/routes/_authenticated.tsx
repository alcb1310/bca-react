import { Box } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import ApplicationBar from '~/components/appbar/AppBar'
import Sidebar from '~/components/sidebar/SideBar'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box display='flex' width='100%' height='100%'>
      <Sidebar />
      <Box
        flexGrow={1}
        height='100%'
        display='flex'
        flexDirection='column'
        sx={{ overflowX: 'auto' }}
      >
        <ApplicationBar />
        <Box
          component='main'
          flexGrow={1}
          display='flex'
          flexDirection='column'
          sx={{ overflowY: 'auto', scrollBehavior: 'smooth' }}
          id='main'
          px={3}
          py={1}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
