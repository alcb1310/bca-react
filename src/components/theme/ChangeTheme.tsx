import { IconButton, Tooltip } from '@mui/material'
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setMode } from '@redux/features/theme/themeSlice'

export default function ChangeTheme() {
    const th = useAppSelector((state) => state.theme.mode)
    const dispatch = useAppDispatch()

    return (
        <Tooltip
            title={th === 'light' ? 'Modo oscuro' : 'Modo Claro'}
            placement='bottom'
            arrow
        >
            <IconButton
                size='medium'
                onClick={() => dispatch(setMode(th === 'light' ? 'dark' : 'light'))}
                sx={{
                    color: 'white',
                }}
            >
                {th === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
        </Tooltip>
    )
}
