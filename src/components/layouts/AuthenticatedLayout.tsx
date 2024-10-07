import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
  return (
    <>
      <Box component="main" sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}>
        <Typography variant="h5" component="h5" textTransform="uppercase" sx={{ textAlign: 'center' }}>
          Aqui va el menu
        </Typography>
        <Outlet />
      </Box>
    </>
  )
}

export default AuthenticatedLayout
