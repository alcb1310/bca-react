import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

export default function Login() {
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

        <FormControl sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%'
        }}>
          <TextField label="Email" variant="outlined" />

          <TextField label="Contraseña" type="password" variant="outlined" />

          <Button variant="contained" type="submit" color="primary">Login</Button>
        </FormControl>
      </Box>
    </>
  )
}
