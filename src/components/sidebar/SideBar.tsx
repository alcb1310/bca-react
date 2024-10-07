import { Box, Drawer } from "@mui/material";

export default function Sidebar() {
  return (
    <Box
      component="nav"
      sx={{ width: 240, flexShrink: 0 }}
    >
      <Drawer
        variant="permanent"
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
          }
        }}
      >
        <Box sx={{ mr: 1, height: '65px', borderBottom: '1px solid #ccc' }} >
          <img src="/favicon.ico" alt="logo" height={50} className="mx-auto py-2 " />
        </Box>
        <Box py={1} sx={{ overflow: 'auto' }}>
          <p className="text-right"> MenuItems</p>
        </Box>
      </Drawer>
    </Box>
  )
}
