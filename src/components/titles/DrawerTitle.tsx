import { CloseOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

type DrawerTitleProps = {
    title: string
    close: () => void
}

export default function DrawerTitle(props: DrawerTitleProps) {
    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{
                borderBottom: '1px solid black',
            }}
        >
            <Typography
                variant='h5'
                data-testid='component.drawertitle.title'
                component='h5'
                textAlign='left'
                sx={{
                    display: 'block',
                }}
            >
                {props.title}
            </Typography>

            <Button
                variant='text'
                startIcon={<CloseOutlined data-testid='component.drawertitle.close' />}
                onClick={props.close}
                color='inherit'
            ></Button>
        </Stack>
    )
}
