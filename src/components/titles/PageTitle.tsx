import { Typography } from '@mui/material'

type PageTitleProps = {
    title: string
}

export default function PageTitle(props: PageTitleProps) {
    return (
        <Typography
            variant='h5'
            data-testid='component.pagetitle.title'
            component='h2'
            textAlign='left'
            py={2}
            mb={2}
            sx={{
                display: 'block',
                borderBottom: '1px solid black',
            }}
        >
            {props.title}
        </Typography>
    )
}
