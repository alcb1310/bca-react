import { ThemeOptions } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      paper: blueGrey[100],
      default: blueGrey[50],
    },
    text: {
      primary: blueGrey[800],
      secondary: '#eceff1',
      disabled: '#eceff1',
    },
    primary: {
      main: '#15803D',
      light: '#eceff1',
      dark: '#eceff1',
    },
  },
}
