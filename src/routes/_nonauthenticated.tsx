import { store } from '@/redux/store'
import { Box } from '@mui/material'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_nonauthenticated')({
  component: RouteComponent,
  beforeLoad: () => {
    const isLoggedIn = store.getState().login.isLoggedIn
    if (isLoggedIn) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Outlet />
    </Box>
  )
}
