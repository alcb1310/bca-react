import { useState, MouseEvent } from 'react'
import { PersonOutline } from '@mui/icons-material'
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import ChangePassword from '@/pages/users/password'

function UserMenu() {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  function handleClick(event: MouseEvent<HTMLElement>) {
    setOpen((prev) => !prev)

    if (open) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  function userNavigation(route: string) {
    setOpen((prev) => !prev)
    navigate(route)
  }

  function openPasswordDrawer() {
    setOpen((prev) => !prev)
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <Tooltip title='Usuarios'>
        <IconButton
          data-testid='user-icon'
          size='large'
          sx={{ color: 'white' }}
          onClick={handleClick}
        >
          <PersonOutline />
        </IconButton>
      </Tooltip>

      <Menu
        data-testid='user-menu'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
      >
        <MenuItem>
          <Button
            data-testid='user-profile'
            variant='text'
            sx={{
              justifyContent: 'start',
              color: 'black',
              padding: 0,
              textTransform: 'none',
            }}
            onClick={() => userNavigation('/usuarios')}
          >
            Mi Perfil
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant='text'
            data-testid='user-admin'
            sx={{
              justifyContent: 'start',
              color: 'black',
              padding: 0,
              textTransform: 'none',
            }}
            onClick={() => userNavigation('/usuarios/admin')}
          >
            Administrar
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant='text'
            data-testid='user-password'
            sx={{
              justifyContent: 'start',
              color: 'black',
              padding: 0,
              textTransform: 'none',
            }}
            onClick={() => openPasswordDrawer()}
          >
            Cambiar Contraseña
          </Button>
        </MenuItem>
      </Menu>
      {showPassword && (
        <ChangePassword onClose={() => setShowPassword((prev) => !prev)} />
      )}
    </>
  )
}

export default UserMenu
