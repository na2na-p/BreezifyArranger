import { isNil } from 'es-toolkit';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAuthTokenStore } from '@/features/auth';
import { getCodeVerifierStore } from '@/features/business/oauth2/codeVerifierStore';
import { getOauth2StateStore } from '@/features/business/oauth2/oauth2StateStore';
import { spotifyEndpoints } from '@/features/business/spotify/endpoints.ts';
import type {
  SpotifyOAuth2CallbackParams,
  SpotifyTokenEndpointResponse,
} from '@/features/business/spotify/types';
import { getConfig } from '@/features/config';
import { getRoutes } from '@/features/routes';

const onFailureCleanup = () => {
  const oauth2StateStore = getOauth2StateStore();
  const codeVerifierStore = getCodeVerifierStore();
  const authTokenStore = getAuthTokenStore();

  oauth2StateStore.flush();
  codeVerifierStore.flush();
  authTokenStore.flush();
};

export const useSpotifyOAuth2Callback = () => {
  const navigate = useNavigate();
  const routes = getRoutes();
  const config = getConfig();
  const location = useLocation();
  const oauth2StateStore = getOauth2StateStore();
  const codeVerifierStore = getCodeVerifierStore();
  const authTokenStore = getAuthTokenStore();

  useEffect(() => {
    const state = oauth2StateStore.get();
    if (state === null) {
      navigate(routes.auth.getPath(), {
        state: { error: 'state is not set' },
      });
      return onFailureCleanup;
    }
    const params = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(
      params.entries()
    ) as SpotifyOAuth2CallbackParams;

    if (state !== paramsObject.state) {
      navigate(routes.auth.getPath(), {
        state: { error: 'state is invalid' },
      });
      return onFailureCleanup;
    }

    if ('error' in paramsObject) {
      navigate(routes.auth.getPath(), {
        state: { error: paramsObject.error },
      });
      return () => {
        oauth2StateStore.flush();
        codeVerifierStore.flush();
        authTokenStore.flush();
      };
    }

    if ('code' in paramsObject) {
      const codeVerifier = codeVerifierStore.get();
      if (isNil(codeVerifier)) {
        navigate(routes.auth.getPath(), {
          state: { error: 'code_verifier is not set' },
        });
        return () => {
          oauth2StateStore.flush();
          codeVerifierStore.flush();
          authTokenStore.flush();
        };
      }
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: config.spotifyOAuth2ClientId,
          redirect_uri: `${window.location.origin}${routes.spotifyOAuth2Callback.getPath()}`,
          grant_type: 'authorization_code',
          code: paramsObject.code,
          code_verifier: codeVerifier,
        }),
      } as const;

      (async () => {
        const body = await fetch(spotifyEndpoints.tokenEndpoint, payload);
        const json = (await body.json()) as SpotifyTokenEndpointResponse;
        if ('error' in json) {
          navigate(routes.auth.getPath(), {
            state: { error: json.error_description },
          });
          oauth2StateStore.flush();
          codeVerifierStore.flush();
          authTokenStore.flush();
          return;
        }

        const expiresIn = json.expires_in;
        if (expiresIn === undefined) {
          navigate(routes.auth.getPath(), {
            state: { error: 'expires_in is not set' },
          });
          oauth2StateStore.flush();
          codeVerifierStore.flush();
          authTokenStore.flush();
          return;
        }

        const accessToken = json.access_token;
        if (accessToken === undefined) {
          navigate(routes.auth.getPath(), {
            state: { error: 'access_token is not set' },
          });
          oauth2StateStore.flush();
          codeVerifierStore.flush();
          authTokenStore.flush();
          return;
        }

        const expiresAt = Date.now() + expiresIn * 1000;
        authTokenStore.set({
          accessToken: json.access_token,
          expiresAt,
        });

        navigate(routes.listPlaylist.getPath());
        return;
      })();
      return () => {
        oauth2StateStore.flush();
        codeVerifierStore.flush();
      };
    }
    return onFailureCleanup;
  }, [
    authTokenStore,
    codeVerifierStore,
    config.spotifyOAuth2ClientId,
    location.search,
    navigate,
    oauth2StateStore,
    routes.auth,
    routes.listPlaylist,
    routes.spotifyOAuth2Callback,
  ]);

  return {};
};
