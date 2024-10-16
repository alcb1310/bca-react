import { AddOutlined, FileDownloadOutlined } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

type EditToolbarProps = {
  title: string
  onClick: () => void
  color?: 'primary' | 'secondary' | 'inherit' | 'success' | 'error' | 'warning' | 'info'
  hasExportButton?: boolean
  exportClick?: () => void
}

export default function EditToolbar({
  title,
  onClick,
  hasExportButton = false,
  exportClick = undefined,
  color = 'primary'
}: EditToolbarProps) {
  return (
    <Stack direction='row' spacing={2}>
      <Button
        variant='text'
        startIcon={<AddOutlined />}
        color={color}
        onClick={onClick}
        size='small'
      >
        {title}
      </Button>

      {hasExportButton && (
        <Button
          variant='text'
          startIcon={<FileDownloadOutlined />}
          onClick={exportClick}
          size='small'
        >
          Exportar
        </Button>
      )}
    </Stack>
  )
}
