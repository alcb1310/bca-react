import { CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { meQuery } from '~/queries/user/user'
import { useAppSelector } from '~/redux/hooks'

export default function Home() {
  const token = useAppSelector((state) => state.login.token)
  const { data, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => meQuery({ token }),
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
