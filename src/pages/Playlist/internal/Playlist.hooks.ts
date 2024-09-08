import type { PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk';
import { isNil } from 'es-toolkit';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SpotifyClientContext } from '@/features/business/spotify/SpotifyClientContext';

export const usePlaylist = () => {
  const urlParams = useParams<{ id: string }>();
  const [playlistDetail, setPlaylistDetail] = useState<
    ReadonlyArray<PlaylistedTrack<Track>>
  >([]);
  const selectedPlaylistId = useMemo(() => urlParams?.id, [urlParams]);

  const spotifyClient = useContext(SpotifyClientContext);
  useEffect(() => {
    let hasNext = true;
    let offset = 0;
    const items = [];
    const limit = 50;
    (async () => {
      if (isNil(selectedPlaylistId)) {
        return;
      }
      while (hasNext) {
        const playlistItemsResponse =
          await spotifyClient.playlists.getPlaylistItems(
            selectedPlaylistId,
            undefined,
            undefined,
            limit,
            offset
          );
        console.log(playlistItemsResponse);
        hasNext = playlistItemsResponse.next !== null;
        offset += limit;
        items.push(...playlistItemsResponse.items);
      }
      setPlaylistDetail(items);
    })();
  }, [spotifyClient.playlists, selectedPlaylistId]);
  return { playlistDetail } as const;
};
