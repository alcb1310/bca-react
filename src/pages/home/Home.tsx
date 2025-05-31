import { CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useMeQuery } from '~/queries/user/user'

export default function Home() {
  const { data, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => useMeQuery(),
  })

  return (
    <>
      {isFetching ? (
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
