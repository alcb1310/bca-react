import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import useLoginForm from './useLoginForm'
import { FormProvider } from 'react-hook-form'
import { LoginSchemaType } from './loginSchema'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logIn } from '../../store/login/loginSlice'
import { Navigate } from 'react-router-dom'
import { useLoginMutation } from '../../api/api/bca-api-slice'

export default function Login() {
    const formMethods = useLoginForm()
    const [loginMutation] = useLoginMutation()
    const [error, setError] = useState<string | undefined>(undefined)
    const isAuthenticated = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()

    async function handleLogin(data: LoginSchemaType) {
        setError(undefined)
        const response = await loginMutation(data)
        if ('error' in response) {
            if ("error" in response.error) {
                setError(response.error.error)
                return
            } else {
                const msg: { data: { error: string } } = response.error as { data: { error: string } }
                setError(msg.data.error)
                return
            }
        } else {
            if (response.data.error !== "") {
                setError(response.data.error)
                return
            }
        }
        dispatch(logIn(response.data.jwt))
    }

    if (isAuthenticated) {
        return <Navigate to={window.history.state?.usr?.from?.pathname ?? "/"} replace />
    }

    return (
        <Stack
            height="100vh"
            width="100%"
            alignContent="center"
            justifyContent="center"
        >
            <Paper
                sx={{
                    mx: 'auto',
                    width: ['90%', 500],
                    p: 2,
                    position: 'relative',
                    background: 'blur(10px)',
                }}
                elevation={8}
            >
                <Typography align="center" variant='h5' component="h1">
                    Login
                </Typography>
                {error !== undefined ? <Typography color="red">{error}</Typography> : null}
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(handleLogin)}>
                        <Stack spacing={3} mt={3}>
                            <TextField size='small' {...formMethods.register("email")} type='email' />
                            <TextField size='small' {...formMethods.register("password")} type='password' />
                            <Button size='small' type='submit' variant='contained'>Login</Button>
                        </Stack>
                    </form>
                </FormProvider>
            </Paper>
        </Stack>
    )
}
