import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import AppRouter from '~components/router/Router'
import Theme from '~components/theme/Theme'

const queryClient = new QueryClient()

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter />
          <Toaster />
        </LocalizationProvider>
      </Theme>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
