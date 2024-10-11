import { useState } from "react";
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "../../types/login";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/features/login/loginSlice";
import { Navigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/bca-backend/auth/authentication";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(loginSchema),
  })
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  const [loginInfo] = useLoginMutation()

  async function onSubmit(data: LoginInput) {
    const res = await loginInfo(data)

    if (!("error" in res)) {
      dispatch(login(res.data.token))
    } else {
      // @ts-ignore
      setError(res.error.error)
    }
  }

  if (isLoggedIn) {
    const dir = window.history.state?.usr?.from?.pathname
    return <Navigate to={dir || '/'} replace />
  }

  return (
    <>
      <Box width="50%" sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5" component="h5" textTransform="uppercase" sx={{ textAlign: 'center' }}>
          Login
        </Typography>

        {error && <Typography color="error" variant="body2" component="p" sx={{ textAlign: 'left', width: '100%' }}> {error} </Typography>}

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: '100%'
            }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <TextField {...field} label="Email" variant="outlined" />}
            />
            {errors.email && <FormHelperText error>{errors.email?.message}</FormHelperText>}

            <Controller
              name="password"
              control={control}
              render={({ field }) => <TextField {...field} label="Contraseña" type="password" variant="outlined" />}
            />
            {errors.password && <FormHelperText error>{errors.password?.message}</FormHelperText>}

            <Button
              variant="contained"
              type="submit"
              color="primary"
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
