import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { routeTree } from '~/routeTree.gen'
import Theme from '~components/theme/Theme'

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
})

export default function AppWrapper() {
  return (
    <>
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
    </>
  )
}
