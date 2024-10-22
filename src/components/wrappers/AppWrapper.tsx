import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import Theme from '../theme/Theme'
import { CssBaseline } from '@mui/material'
import AppRouter from '../router/Router'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
