import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import AppRouter from '../router/Router'
import Theme from '../theme/Theme'

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
