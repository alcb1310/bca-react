import { Box, CircularProgress, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PageTitle from '~/components/titles/PageTitle/PageTitle'
import { useMeQuery } from '~/queries/user/user'
import { useAppSelector } from '~/redux/hooks'

export default function UsersHome() {
  const token = useAppSelector((state) => state.login.token)
  const { data, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => useMeQuery({ token }),
  })

  const componentLayout = (
    <>
      <Typography variant='body1' component='p'>
        <Typography variant='body1' component='span' color='success'>
          Nombre:&nbsp;
        </Typography>
        <Typography
          variant='body1'
          component='span'
          data-testid='page.user.name'
        >
          {data?.name}
        </Typography>
      </Typography>

      <Typography variant='body1' component='p'>
        <Typography variant='body1' component='span' color='success'>
          Email:&nbsp;
        </Typography>
        <Typography
          variant='body1'
          component='span'
          data-testid='page.user.email'
        >
          {data?.email}
        </Typography>
      </Typography>
      <br />

      <Typography
        variant='body1'
        component='p'
        sx={{
          fontSize: '0.8rem',
        }}
      >
        Para modificar el perfil, favor contactarse con el administrador
      </Typography>
    </>
  )

  return (
    <>
      <PageTitle title='Perfil' />
      <Box sx={{ marginTop: 2 }}>
        {isFetching ? (
          <CircularProgress data-testid='page.user.loading' />
        ) : (
          componentLayout
        )}
      </Box>
    </>
  )
}
