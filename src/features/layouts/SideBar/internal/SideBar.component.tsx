import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { useSideBar } from './SideBar.hooks';

export const SideBar = () => {
  const { selectedPlaylist, userPlaylists, onPlaylistClick } = useSideBar();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {userPlaylists.map(userPlaylist => (
          <ListItem key={userPlaylist.id} disablePadding>
            <ListItemButton
              selected={userPlaylist.id === selectedPlaylist}
              onClick={() => {
                onPlaylistClick(userPlaylist.id);
              }}
            >
              <ListItemText primary={userPlaylist.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
