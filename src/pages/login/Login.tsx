import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useLoginMutation } from '~/queries/auth/authentication'
import { login } from '~redux/features/login/loginSlice'
import { useAppDispatch } from '~redux/hooks'
import { type LoginInput, loginSchema } from '~types/login'

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
  const dispatch = useAppDispatch()
  const { mutate } = useMutation({
    mutationFn: useLoginMutation,
    onError: (error) => {
      setError(error.message)
    },
    onSuccess: (data) => {
      dispatch(login(data.token))
      const dir = window.history.state?.usr?.from?.pathname
      return <Navigate to={dir || '/'} replace />
    },
  })
  async function onSubmit(data: LoginInput) {
    mutate(data)
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
