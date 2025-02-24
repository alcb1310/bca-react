import { Link } from 'react-router-dom'
import { Box, Drawer } from '@mui/material'

import TransactionsMenu from '@/components/menu/Transactions/Transactions'
import ReportsMenu from '@/components/menu/Reports/Reports'
import ParametersMenu from '@/components/menu/Parameters/Parameters'
import AnalysisMenu from '@/components/menu/Analysis/Analysis'

export default function Sidebar() {
    return (
        <Box component='nav' sx={{ width: 240, flexShrink: 0 }}>
            <Drawer
                variant='permanent'
                open
                PaperProps={{
                    elevation: 16,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                        p: 1,
                        pt: 0,
                        border: 'none',
                    },
                }}
            >
                <Box sx={{ mr: 1, height: '65px', borderBottom: '1px solid #ccc' }}>
                    <Link to='/'>
                        <img
                            src='/favicon.ico'
                            alt='logo'
                            height={50}
                            className='mx-auto py-2 '
                        />
                    </Link>
                </Box>

                <Box py={1} sx={{ overflow: 'auto' }}>
                    <TransactionsMenu />
                    <ReportsMenu />
                    <ParametersMenu />
                    <AnalysisMenu />
                </Box>
            </Drawer>
        </Box>
    )
}
