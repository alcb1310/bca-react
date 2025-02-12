import { createTheme, ThemeProvider } from '@mui/material'

import { useAppSelector } from '~redux/hooks'

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
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
