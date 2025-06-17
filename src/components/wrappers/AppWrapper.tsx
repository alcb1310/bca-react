import AppRouter from '@/components/router/Router'
import Theme from '@/components/theme/Theme'
import { Toaster } from '@/components/ui/sonner'
import { store } from '@/redux/store'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux'

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter />
          <Toaster />
        </LocalizationProvider>
      </Theme>
    </Provider>
  )
}
