import { useState, MouseEvent } from "react"
import { PersonOutline } from "@mui/icons-material"
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { Link } from "react-router-dom"

function UserMenu() {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  function handleClick(event: MouseEvent<HTMLElement>) {
    setOpen(prev => !prev)

    if (open) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <>
      <Tooltip
        title="Usuarios"
      >
        <IconButton
          size="large"
          sx={{ color: 'white' }}
          onClick={handleClick}
        >
          <PersonOutline />
        </IconButton>
      </Tooltip >

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
      >
        <MenuItem>
          <Link to='/usuarios' onClick={handleClick}>
            Mi Perfil
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/usuarios/admin' onClick={handleClick}>
            Administrar
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/usuarios/contrasena' onClick={handleClick}>
            Cambiar Contraseña
          </Link>
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
