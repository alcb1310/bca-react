import { Box, Drawer } from '@mui/material'

type BcaDrawerProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function BcaDrawer({ open, onClose, children }: BcaDrawerProps) {
  const drawerWidth = '300px'

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 8,
      }}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box p={3}>{children}</Box>
    </Drawer>
  )
}
