import { Box, Button, Drawer, Stack } from "@mui/material"
import { ReactNode } from "react"
import DrawerTitle from "../drawertitle/drawertitle.component"

type AlcbDrawerProps = {
    children: ReactNode
    open: boolean
    closeDrawer: () => void
    title: string
}

export default function AlcbDrawer({ children, title, open, closeDrawer }: AlcbDrawerProps) {
    return (
        <>
            <Drawer
                open={open}
                onClose={closeDrawer}
                anchor="right"
                sx={{
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 350,
                    },
                }}
            >
                <Box p={3} width="100%" >
                    <Stack direction="column" justifyContent="space-between" height="90vh">
                        <div>
                            <DrawerTitle close={closeDrawer} title={title} />
                            {children}
                        </div>
                        <Button>Grabar</Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    )
}
