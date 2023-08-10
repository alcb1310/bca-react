import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material"
import { useAppDispatch } from '../../store/hooks'
import { logOut } from "../../store/login/loginSlice"
import { useNavigate } from "react-router-dom"

type TitleBarProps = {
    drawerWidth: number
}

export default function TitleBar({ drawerWidth }: TitleBarProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    function handleLogOut() {
        dispatch(logOut())
        navigate("/login")
        return
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}>
            <Toolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    <Typography component="h1" variant="h6">
                        Budget Control Appliction
                    </Typography>
                    <Button sx={{ color: "white" }} variant="text" onClick={handleLogOut}>Sign Out</Button>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}
