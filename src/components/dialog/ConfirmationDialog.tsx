import { forwardRef, ReactElement, Ref } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

interface ConfirmationDialogProps {
  message: string
  open: boolean
  setOpen: (open: boolean) => void
  confirm: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />
})

export default function ConfirmationDialog({
  confirm,
  open,
  setOpen,
  message,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    confirm()
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleCancel} TransitionComponent={Transition}>
      <DialogTitle color='warning'>Confirmaci&oacute;n</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Confirmar</Button>
        <Button onClick={handleCancel}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}
