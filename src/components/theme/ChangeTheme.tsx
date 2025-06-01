import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

export default function ChangeTheme() {
  const th = 'light'

  return (
    <Tooltip
      title={th === 'light' ? 'Modo oscuro' : 'Modo Claro'}
      placement='bottom'
      arrow
    >
      <IconButton
        size='medium'
        sx={{
          color: 'white',
        }}
      >
        {th === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Tooltip>
  )
}
