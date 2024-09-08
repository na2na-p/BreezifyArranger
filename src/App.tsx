import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard, GuestGuard } from '@/features/auth';
import { AuthorizedLayout } from '@/features/layouts/AuthorizedLayout';
import { getRoutes } from '@/features/routes';
import { Playlist } from '@/pages/Playlist';
import { SpotifyOAuth2Callback } from '@/pages/auth/SpotifyOAuth2Callback';
import { AuthMain } from '@/pages/auth/top';
import { ListPlaylist } from '@/pages/listPlaylist';

export const App = () => {
  const routes = useMemo(() => getRoutes(), []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard />}>
          <Route path="/" element={<AuthorizedLayout />}>
            <Route
              path={routes.listPlaylist.path()}
              element={<ListPlaylist />}
            />
            <Route path={routes.playlist.path({})} element={<Playlist />} />
          </Route>
        </Route>
        <Route path="/" element={<GuestGuard />}>
          <Route path={routes.auth.path()} element={<AuthMain />} />
          <Route
            path={routes.spotifyOAuth2Callback.path()}
            element={<SpotifyOAuth2Callback />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
