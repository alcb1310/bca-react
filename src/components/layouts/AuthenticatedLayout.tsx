import ApplicationBar from '@/components/appbar/AppBar'
import Sidebar from '@/components/sidebar/SideBar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

function AuthenticatedLayout() {
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

export default AuthenticatedLayout
