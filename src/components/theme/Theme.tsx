import { ThemeProvider, createTheme } from '@mui/material'

type ThemeProps = {
  children: React.ReactNode
}

export default function Theme({ children }: ThemeProps) {
  const th = 'light'

  const theme = createTheme({
    colorSchemes: {
      light: th === 'light',
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
