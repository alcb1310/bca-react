import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import useLoginForm from './useLoginForm'
import { FormProvider } from 'react-hook-form'
import { LoginSchemaType } from './loginSchema'

export default function Login() {
    const formMethods = useLoginForm()

    function handleLogin(data: LoginSchemaType) {
        console.log("Logging in")
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
