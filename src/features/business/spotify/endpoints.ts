export const spotifyEndpoints = {
  oauth2Endpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
} as const satisfies Record<string, string>;
