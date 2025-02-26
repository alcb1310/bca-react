import { CircularProgress, Typography } from '@mui/material'

import { useMeQuery } from '@redux/api/bca-backend/user/userSlice'

export default function Home() {
  const { data, isLoading } = useMeQuery()
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
