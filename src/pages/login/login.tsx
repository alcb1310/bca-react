import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { LoginInput } from "../../types/login";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/features/login/loginSlice";
import { Navigate } from "react-router-dom";

export default function Login() {
  // TODO: Handle form errors
  const {
    control,
    handleSubmit,
  } = useForm<LoginInput>({
    // TODO: Add validation using zodResolver
  })
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()

  function onSubmit(data: LoginInput) {
    console.log(data)
    // TODO: Authenticate the login information with the server
    dispatch(login())
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => <TextField {...field} label="Contraseña" type="password" variant="outlined" />}
            />

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
