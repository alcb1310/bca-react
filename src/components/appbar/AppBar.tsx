import {
    AppBar,
    Box,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import ChangeTheme from '@components/theme/ChangeTheme'
import { LogoutOutlined } from '@mui/icons-material'
import UserMenu from '@/components/menu/User/User'
import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/login/loginSlice'

export default function ApplicationBar() {
    const dispatch = useAppDispatch()

    function handleLogout() {
        dispatch(logout())
    }

    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Typography
                    data-testid='title'
                    variant='h6'
                    noWrap
                    component='h6'
                    textTransform='uppercase'
                    fontWeight={700}
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Sistema Control Prespuestario
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <Stack direction='row' spacing={2}>
                    <UserMenu />
                    <ChangeTheme />

                    <Tooltip title='Cerrar sesión'>
                        <IconButton
                            size='large'
                            onClick={handleLogout}
                            sx={{ color: 'white' }}
                        >
                            <LogoutOutlined data-testid='logout-icon' />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
