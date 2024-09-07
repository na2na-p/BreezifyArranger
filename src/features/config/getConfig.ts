const getConfig = () => ({
  spotifyOAuth2ClientId: import.meta.env.VITE_SPOTIFY_OAUTH2_CLIENT_ID,
});

export default getConfig;
