import { Me } from '@/queries/users'
import { CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: () => Me(),
    })

    return (
        <>
            {isLoading ? (
                <CircularProgress data-testid='pages.home.spinner' />
            ) : (
                <Typography
                    data-testid='pages.home.welcome'
                    variant='body1'
                    component='p'
                >
                    Bienvenido&nbsp;
                    <Typography
                        data-testid='pages.home.username'
                        variant='body1'
                        component='span'
                        color='success'
                    >
                        {data?.name}
                    </Typography>
                </Typography>
            )}
        </>
    )
}
