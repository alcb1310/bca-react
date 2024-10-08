import { AppBar, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import ChangeTheme from "../theme/ChangeTheme";
import { LogoutOutlined } from "@mui/icons-material";
import UserMenu from "../menu/User";

export default function ApplicationBar() {
  return (
    <AppBar
      position="sticky"
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="h6"
          textTransform='uppercase'
          fontWeight={700}
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Sistema Control Prespuestario
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={2}>
          <UserMenu />
          <ChangeTheme />

          <Tooltip
            title="Cerrar sesión"
          >
            <IconButton size="large" sx={{ color: 'white' }}>
              <LogoutOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar >
  )
}
