import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { isNil } from 'es-toolkit';
import type { PropsWithChildren} from 'react';
import { createContext, useState } from 'react';

import { getAuthTokenStore } from '@/features/auth';
import { getConfig } from '@/features/config';

// eslint-disable-next-line react-refresh/only-export-components
export const SpotifyClientContext = createContext<SpotifyApi>({} as SpotifyApi);

export const SpotifyClientContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const config = getConfig();
  const authTokenStore = getAuthTokenStore();
  const spotifyOAuth2Token = authTokenStore.get();
  if (isNil(spotifyOAuth2Token)) {
    throw new Error('Spotify OAuth2 token is not set');
  }
  const [spotifyClient] = useState<SpotifyApi>(
    SpotifyApi.withAccessToken(
      config.spotifyOAuth2ClientId,
      spotifyOAuth2Token as AccessToken
    )
  );

  return (
    <SpotifyClientContext.Provider value={spotifyClient}>
      {children}
    </SpotifyClientContext.Provider>
  );
};
