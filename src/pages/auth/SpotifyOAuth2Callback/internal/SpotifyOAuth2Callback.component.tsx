import { useSpotifyOAuth2Callback } from './SpotifyOAuth2Callback.hooks';

export const SpotifyOAuth2Callback = () => {
  useSpotifyOAuth2Callback();
  return <h1>Authorized.</h1>;
};
