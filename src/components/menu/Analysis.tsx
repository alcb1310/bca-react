import { useState } from 'react'
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'
import {
    AnalyticsOutlined,
    ChevronRightOutlined,
    ExpandMoreOutlined,
    ProductionQuantityLimitsOutlined,
} from '@mui/icons-material'

export default function AnalysisMenu() {
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
                    primary='Analisis'
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
                        to='/analisis/cantidad'
                        sx={{ mb: 1, borderRadius: 2 }}
                        selected={str.toLowerCase() === '/analisis/cantidad'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <ProductionQuantityLimitsOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='Cantidades'
                            primaryTypographyProps={{
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                            }}
                        />
                    </ListItemButton>

                    <ListItemButton
                        component={NavLink}
                        to='/analisis/analisis'
                        sx={{ mb: 1, borderRadius: 2 }}
                        selected={str.toLowerCase() === '/analisis/analisis'}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                            <AnalyticsOutlined sx={{ fontSize: '0.75rem' }} />
                        </ListItemIcon>

                        <ListItemText
                            primary='analisis'
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
