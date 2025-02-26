import { ThemeOptions } from '@mui/material/styles'
import { blueGrey, green } from '@mui/material/colors'

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[800],
      paper: blueGrey[900],
    },
    text: {
      primary: blueGrey[50],
      secondary: blueGrey[500],
      disabled: '#eceff1',
    },
    primary: {
      main: green[500],
      light: '#eceff1',
      dark: '#eceff1',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: '#eceff1',
        },
      },
    },
  },
}
