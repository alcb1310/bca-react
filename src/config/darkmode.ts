import { ThemeOptions } from "@mui/material/styles"
import { blueGrey } from "@mui/material/colors"

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[800],
      paper: blueGrey[900],
    },
    text: {
      primary:blueGrey[50],
      secondary: '#eceff1',
      disabled: '#eceff1',
    },
    primary: {
      main: '#15803D',
      light: '#eceff1',
      dark: '#eceff1',
    }
  }
}
