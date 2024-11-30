import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SpotifyClientContext } from '@/features/business/spotify/SpotifyClientContext';
import { getRoutes } from '@/features/routes';

export const useSideBar = () => {
  const urlParams = useParams<{ id: string }>();
  const [userPlaylists, setUserPlaylists] = useState<
    ReadonlyArray<SimplifiedPlaylist>
  >([]);
  const routes = getRoutes();
  const navigate = useNavigate();
  const selectedPlaylist = useMemo(() => {
    return urlParams.id;
  }, [urlParams.id]);

  const onPlaylistClick = (playlistId: SimplifiedPlaylist['id']) => {
    navigate(routes.playlist.path({ id: playlistId }));
  };

  const spotifyClient = useContext(SpotifyClientContext);
  useEffect(() => {
    (async () => {
      const playlists = await spotifyClient.currentUser.playlists.playlists();
      setUserPlaylists(playlists.items.filter((item) => item !== null));
    })();
  }, [spotifyClient.currentUser.playlists]);
  return { userPlaylists, selectedPlaylist, onPlaylistClick } as const;
};
