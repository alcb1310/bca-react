import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function UnauthenticatedLayout() {
  return (
    <>
      <Box component="main" sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}>
        <Outlet />
      </Box>
    </>
  )
}
