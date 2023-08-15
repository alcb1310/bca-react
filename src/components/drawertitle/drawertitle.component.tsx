import { Button, Typography } from "@mui/material"
import { Close } from '@mui/icons-material'
import { Stack } from "@mui/system"

type DrawerTitleProps = {
    title: string
    close: () => void
}

export default function DrawerTitle({ title, close }: DrawerTitleProps) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" data-testid="drawer.title">
                {title}
            </Typography>
            <Button onClick={close} startIcon={<Close />} />
        </Stack>
    )
}
