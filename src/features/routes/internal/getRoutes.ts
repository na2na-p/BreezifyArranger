type Routes = Record<
  string,
  {
    key: string;
    getPath: (...args: ReadonlyArray<string>) => string;
  }
>;

export const getRoutes = () => {
  return {
    auth: {
      key: 'auth',
      getPath: () => '/auth',
    },
    spotifyOAuth2Callback: {
      key: 'spotifyOAuth2Callback',
      getPath: () => '/auth/spotify-oauth2-callback',
    },
    listPlaylist: {
      key: 'listPlaylist',
      getPath: () => '/playlists',
    },
  } as const satisfies Routes;
};
