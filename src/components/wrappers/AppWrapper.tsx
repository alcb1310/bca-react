import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CssBaseline } from '@mui/material'

import { store } from '@redux/store'
import Theme from '@components/theme/Theme'
import AppRouter from '@components/router/Router'

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <Theme>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter />
        </LocalizationProvider>
      </Theme>
    </Provider>
  )
}
