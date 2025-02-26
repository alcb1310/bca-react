import { CancelOutlined, SaveOutlined } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

type ButtonGroupProps = {
  saveFunction: () => void
  cancelFunction: () => void
}

export default function ButtonGroup({
  saveFunction,
  cancelFunction,
}: ButtonGroupProps) {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Button
        variant='contained'
        startIcon={<SaveOutlined />}
        data-testid='component.button.group.save'
        color='primary'
        onClick={saveFunction}
        type='submit'
        size='small'
      >
        Guardar
      </Button>

      <Button
        variant='outlined'
        data-testid='component.button.group.cancel'
        startIcon={<CancelOutlined />}
        color='primary'
        onClick={cancelFunction}
        size='small'
      >
        Cancelar
      </Button>
    </Stack>
  )
}
