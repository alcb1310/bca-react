import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material"
import { useAppDispatch } from '../../store/hooks'
import { logOut } from "../../store/login/loginSlice"

type TitleBarProps = {
    drawerWidth: number
}

export default function TitleBar({ drawerWidth }: TitleBarProps) {
    const dispatch = useAppDispatch()

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
                    <Button sx={{ color: "white" }} variant="text" onClick={() => dispatch(logOut())}>Sign Out</Button>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}
