import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { LogoutButton } from '@/features/auth';

export const TopBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          BreezifyArranger
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};
