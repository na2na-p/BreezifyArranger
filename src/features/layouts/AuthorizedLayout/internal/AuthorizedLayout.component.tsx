import { Box, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { SpotifyClientContextProvider } from '@/features/business/spotify/SpotifyClientContext';
import { SideBar } from '@/features/layouts/SideBar';
import { TopBar } from '@/features/layouts/TopBar';
import { Spacer } from '@/features/ui/Spacer';

const drawerWidth = 240;

export const AuthorizedLayout = () => {
  return (
    <SpotifyClientContextProvider>
      <Box sx={{ display: 'flex' }}>
        <TopBar />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Spacer size="64px" />
          <SideBar />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Spacer size="32px" />
          <Outlet />
        </Box>
      </Box>
    </SpotifyClientContextProvider>
  );
};
