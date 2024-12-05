export type Path = `/${string}/`;
type Routes = Record<
  string,
  { path: Path | ((args: Record<string, string>) => Path) }
>;

export const getRoutes = () => {
  return {
    auth: {
      path: () => '/auth/',
    },
    spotifyOAuth2Callback: {
      path: () => '/auth/spotify-oauth2-callback/',
    },
    spotifyOAuth2InvalidClientCallback: {
      path: () => '/auth/spotify-oauth2-invalidclient-callback/',
    },
    listPlaylist: {
      path: () => '/playlists/',
    },
    playlist: {
      path: ({ id = ':id' }) => `/playlists/${id}/`,
    },
  } as const satisfies Routes;
};
