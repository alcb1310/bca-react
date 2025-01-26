import { Box, Drawer } from '@mui/material'

type BcaDrawerProps = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    width?: string
}

export default function BcaDrawer({
    open,
    onClose,
    children,
    width = '300px',
}: BcaDrawerProps) {
    return (
        <Drawer
            anchor='right'
            data-testid='component.drawer'
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 8,
            }}
            sx={{
                width: width,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box p={3}>{children}</Box>
        </Drawer>
    )
}
