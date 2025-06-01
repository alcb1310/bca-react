import { Box } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
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
