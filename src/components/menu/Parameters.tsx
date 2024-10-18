import {
  AccountTreeOutlined,
  CategoryOutlined,
  ChevronRightOutlined,
  ExpandMoreOutlined,
  FactoryOutlined,
  InventoryOutlined,
  ViewKanbanOutlined,
} from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function ParametersMenu() {
  const [open, setOpen] = useState<boolean>(true)
  const str = useLocation().pathname

  return (
    <Box>
      <ListItemButton onClick={() => setOpen((prev) => !prev)}>
        <ListItemText
          primary='Parametros'
          primaryTypographyProps={{
            fontWeight: 'bold',
            fontSize: '0.85rem',
            lineHeight: '1rem',
            textTransform: 'uppercase',
          }}
        />
        {open ? <ExpandMoreOutlined /> : <ChevronRightOutlined />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding dense>
          <ListItemButton
            component={NavLink}
            to='/parametros/partidas'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/partidas'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <ViewKanbanOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Partidas'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to='/parametros/categorias'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/categorias'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <CategoryOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Categorias'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to='/parametros/materiales'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/materiales'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <InventoryOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Materiales'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to='/parametros/proyectos'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/proyectos'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AccountTreeOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Proyectos'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to='/parametros/proveedores'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/proveedores'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <FactoryOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Proveedores'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to='/parametros/rubros'
            sx={{ borderRadius: 2 }}
            selected={str.toLowerCase() === '/parametros/rubros'}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <FactoryOutlined sx={{ fontSize: '0.75rem' }} />
            </ListItemIcon>

            <ListItemText
              primary='Rubros'
              primaryTypographyProps={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  )
}
