import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginInput, loginSchema } from '@/types/login'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { login } from '@redux/features/login/loginSlice'
import { useLoginMutation } from '@redux/api/bca-backend/auth/authentication'

export default function Login() {
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  const [loginInfo] = useLoginMutation()

  async function onSubmit(data: LoginInput) {
    const res = await loginInfo(data)

    if (!('error' in res)) {
      dispatch(login(res.data.token))
    } else {
      // @ts-expect-error error property is part of the res.error object
      setError(res.error.error)
    }
  }

  if (isLoggedIn) {
    const dir = window.history.state?.usr?.from?.pathname
    return <Navigate to={dir || '/'} replace />
  }

  return (
    <>
      <Box
        width='50%'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='h5'
          data-testid='pages.login.title'
          component='h5'
          textTransform='uppercase'
          sx={{ textAlign: 'center' }}
        >
          Login
        </Typography>

        {error && (
          <Typography
            color='error'
            variant='body2'
            component='p'
            data-testid='pages.login.error'
            sx={{ textAlign: 'left', width: '100%' }}
          >
            {error}
          </Typography>
        )}

        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%',
            }}
          >
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-testid='pages.login.form.email'
                  size='small'
                  label='Email'
                  variant='outlined'
                />
              )}
            />
            {errors.email && (
              <FormHelperText data-testid='pages.login.form.email.error' error>
                {errors.email?.message}
              </FormHelperText>
            )}

            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-testid='pages.login.form.password'
                  size='small'
                  label='Contraseña'
                  type='password'
                  variant='outlined'
                />
              )}
            />
            {errors.password && (
              <FormHelperText
                data-testid='pages.login.form.password.error'
                error
              >
                {errors.password?.message}
              </FormHelperText>
            )}

            <Button
              variant='contained'
              data-testid='pages.login.form.submit'
              type='submit'
              color='primary'
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Box>
    </>
  )
}
