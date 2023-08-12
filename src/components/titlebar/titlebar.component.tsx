import { AppBar, Button, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Typography } from "@mui/material"
import { useAppDispatch } from '../../store/hooks'
import { logOut } from "../../store/login/loginSlice"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

type TitleBarProps = {
    drawerWidth: number
}

export default function TitleBar({ drawerWidth }: TitleBarProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    function handleLogOut() {
        dispatch(logOut())
        navigate("/login")
        return
    }

    function handleLanguageChange(e: SelectChangeEvent) {
        i18n.changeLanguage(e.target.value)
        localStorage.setItem("i18nextLng", e.target.value)
    }

    useEffect(() => {
        const lng = localStorage.getItem("i18nextLng")
        if (!lng || lng?.length > 2) {
            i18n.changeLanguage("es")
            localStorage.setItem("i18nextLng", "es")
        }
    }, [i18n])

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
                    <Typography data-testid="titlebar.title" component="h1" variant="h6">
                        {t('layout.title')}
                    </Typography>
                    <Stack direction="row">
                        <Select
                            size="small"
                            variant="standard"
                            sx={{
                                color: "#fafafa",
                            }}
                            onChange={handleLanguageChange}
                            value={localStorage.getItem("i18nextLng") ?? "es"}
                        >
                            <MenuItem value="es">
                                <Typography variant="caption">
                                    Español
                                </Typography>
                            </MenuItem>
                        </Select>
                        <Button data-testid="titlebar.logout" sx={{ color: "white" }} variant="text" onClick={handleLogOut}>
                            {t('layout.logout')}
                        </Button>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar >
    )
}
