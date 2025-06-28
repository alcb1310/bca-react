import Theme from '@/components/theme/Theme'
import { Toaster } from '@/components/ui/sonner'
import { store } from '@/redux/store'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux'
import { routeTree } from '@/routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { queryClient },
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Theme>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
            <Toaster />
          </LocalizationProvider>
        </Theme>
      </Provider>
    </QueryClientProvider>
  )
}
