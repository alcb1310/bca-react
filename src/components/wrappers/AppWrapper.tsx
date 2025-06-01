import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { routeTree } from '~/routeTree.gen'
import Theme from '~components/theme/Theme'

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
})

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <Toaster />
        </LocalizationProvider>
      </Theme>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
