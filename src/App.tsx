import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard, GuestGuard } from '@/features/auth';
import { getRoutes } from '@/features/routes';
import { SpotifyOAuth2Callback } from '@/pages/auth/SpotifyOAuth2Callback';
import { AuthMain } from '@/pages/auth/top';
import { ListPlaylist } from '@/pages/listPlaylist';

export const App = () => {
  const routes = useMemo(() => getRoutes(), []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard />}>
          <Route
            path={routes.listPlaylist.getPath()}
            element={<ListPlaylist />}
          />
        </Route>
        <Route path="/" element={<GuestGuard />}>
          <Route path={routes.auth.getPath()} element={<AuthMain />} />
          <Route
            path={routes.spotifyOAuth2Callback.getPath()}
            element={<SpotifyOAuth2Callback />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
