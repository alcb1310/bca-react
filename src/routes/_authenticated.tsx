import { Box } from '@mui/material'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import ApplicationBar from '~/components/appbar/AppBar'
import Sidebar from '~/components/sidebar/SideBar'
import { loginStore } from '~/store/login'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const token = loginStore.state.token
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
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
