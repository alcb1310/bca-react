import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import AppSidebar from '@components/sidebar/SideBar'
import ApplicationBar from '@components/appbar/AppBar'
import { SidebarProvider } from '@/components/ui/sidebar'

function AuthenticatedLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <Box
                flexGrow={1}
                height='100%'
                display='flex'
                flexDirection='column'
                sx={{ overflowX: 'auto' }}
            >
                <ApplicationBar />

                <Box
                    component='main'
                    flexGrow={1}
                    display='flex'
                    flexDirection='column'
                    sx={{ overflowY: 'auto', scrollBehavior: 'smooth' }}
                    id='main'
                    px={3}
                    py={1}
                >
                    <Outlet />
                </Box>
            </Box>
        </SidebarProvider>
    )
}

export default AuthenticatedLayout
