import { ThemeProvider, createTheme } from '@mui/material'

import { useAppSelector } from '~redux/hooks'

type ThemeProps = {
  children: React.ReactNode
}

export default function Theme({ children }: ThemeProps) {
  const th = useAppSelector((state) => state.theme.mode)

  const theme = createTheme({
    colorSchemes: {
      light: th === 'light',
      dark: th === 'dark',
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
