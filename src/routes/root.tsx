import { Box, CssBaseline, Divider, Drawer, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import TitleBar from '../components/titlebar/titlebar.component'
import NavBar from '../components/navbar/navbar.component';

export default function RootLayout() {
    const drawerWidth = 240

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <NavBar />
        </div>
    );

    return (
        <>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <TitleBar drawerWidth={drawerWidth} />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}
