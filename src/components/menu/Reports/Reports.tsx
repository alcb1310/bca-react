import { useState } from 'react'
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import {
    AddchartOutlined,
    BalanceOutlined,
    ChevronRightOutlined,
    ExpandMoreOutlined,
    LocalAtmOutlined,
    WorkHistoryOutlined,
} from '@mui/icons-material'
import { NavLink, useLocation } from 'react-router-dom'

export default function ReportsMenu() {
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
                    primary='Reportes'
                    data-testid='menu.reports'
                    primaryTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        lineHeight: '1rem',
                        textTransform: 'uppercase',
                    }}
                />
                {open ? (
                    <ExpandMoreOutlined data-testid='menu.reports.open-chevron' />
                ) : (
                    <ChevronRightOutlined data-testid='menu.reports.closed-chevron' />
                )}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding dense>
                    <ListItemButton
                        component={NavLink}
                        to='/reportes/actual'
                        sx={{ borderRadius: 2 }}
                        selected={str.toLowerCase() === '/reportes/actual'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <AddchartOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Actual'
                            data-testid='menu.reports.actual'
                            primaryTypographyProps={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        component={NavLink}
                        to='/reportes/cuadre'
                        sx={{ borderRadius: 2 }}
                        selected={str.toLowerCase() === '/reportes/cuadre'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <BalanceOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Cuadre'
                            data-testid='menu.reports.balance'
                            primaryTypographyProps={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        component={NavLink}
                        to='/reportes/gastado-por-partida'
                        sx={{ borderRadius: 2 }}
                        selected={str.toLowerCase() === '/reportes/gastado-por-partida'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <LocalAtmOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Gastado por Partida'
                            data-testid='menu.reports.spent'
                            primaryTypographyProps={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        component={NavLink}
                        to='/reportes/historico'
                        sx={{ borderRadius: 2 }}
                        selected={str.toLowerCase() === '/reportes/historico'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <WorkHistoryOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Historico'
                            data-testid='menu.reports.historic'
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
