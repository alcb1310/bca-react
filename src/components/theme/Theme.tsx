import { createTheme, ThemeProvider } from '@mui/material'
// import { darkTheme } from "../../config/darkmode"
// import { lightTheme } from "../../config/lightmode"
import { useAppSelector } from '../../redux/hooks'

type ThemeProps = {
  children: React.ReactNode
}

export default function Theme({ children }: ThemeProps) {
  const th = useAppSelector((state) => state.theme.mode)

  const theme = createTheme({
    colorSchemes: {
      light: th === 'light' ? true : false,
      dark: th === 'dark' ? true : false,
    },
    // palette: th === 'light' ? lightTheme.palette : darkTheme.palette
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
