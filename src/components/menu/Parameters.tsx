import {
    AccountTreeOutlined,
    CategoryOutlined,
    ChevronRightOutlined,
    ExpandMoreOutlined,
    FactoryOutlined,
    InfoOutlined,
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
            <ListItemButton
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                }}
            >
                <ListItemText
                    primary='Parametros'
                    data-testid='menu.parameters'
                    primaryTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        lineHeight: '1rem',
                        textTransform: 'uppercase',
                    }}
                />
                {open ? (
                    <ExpandMoreOutlined data-testid='menu.parameters.open-chevron' />
                ) : (
                    <ChevronRightOutlined data-testid='menu.parameters.closed-chevron' />
                )}
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
                            data-testid='menu.parameters.budget-items'
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
                            data-testid='menu.parameters.categories'
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
                            data-testid='menu.parameters.materials'
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
                            data-testid='menu.parameters.projects'
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
                            data-testid='menu.parameters.suppliers'
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
                            <InfoOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Rubros'
                            data-testid='menu.parameters.items'
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
