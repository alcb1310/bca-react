import { Typography } from "@mui/material"

type PageTitleProps = {
    title: string
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <>
            <Typography data-testid="pagetitle" variant="h5" component="h2">{title}</Typography>
        </>
    )
}
