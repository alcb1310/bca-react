import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux'

import AppRouter from '~components/router/Router'
import Theme from '~components/theme/Theme'
import { store } from '~redux/store'

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
