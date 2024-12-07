import { Box, Drawer } from '@mui/material'

type BcaDrawerProps = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    width?: string
}

export default function BcaDrawer({ open, onClose, children, width }: BcaDrawerProps) {
    const drawerWidth = !width ? '300px' : width

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
