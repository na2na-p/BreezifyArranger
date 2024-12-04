import { isNil } from 'es-toolkit';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getAuthTokenStore } from '@/features/auth';
import { getCodeVerifierStore } from '@/features/business/oauth2/codeVerifierStore';
import { createCodeChallenge } from '@/features/business/oauth2/createCodeChallenge';
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

type PKCEParams = {
  codeChallengeMethod: string;
  codeChallenge: string;
  expectedCodeVerifier: string;
};

export const useSpotifyOAuth2InvalidClientCallback = () => {
  const [tokenResult, setTokenResult] =
    useState<SpotifyTokenEndpointResponse | null>(null);
  const [tokenRequestBody, setTokenRequestBody] = useState<{} | null>(null);
  const [expectedPKCEParams, setExpectedPKCEParams] = useState<PKCEParams>();
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
      return onFailureCleanup;
    }
    const params = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(
      params.entries()
    ) as SpotifyOAuth2CallbackParams;

    if (state !== paramsObject.state) {
      return onFailureCleanup;
    }

    if ('error' in paramsObject) {
      return () => {
        oauth2StateStore.flush();
        codeVerifierStore.flush();
        authTokenStore.flush();
      };
    }

    if ('code' in paramsObject) {
      const codeVerifier = codeVerifierStore.get();
      if (isNil(codeVerifier)) {
        return () => {
          oauth2StateStore.flush();
          codeVerifierStore.flush();
          authTokenStore.flush();
        };
      }
      createCodeChallenge(codeVerifier).then(challenge => {
        setExpectedPKCEParams({
          codeChallenge: challenge,
          codeChallengeMethod: 'S256',
          expectedCodeVerifier: codeVerifier,
        });
        const params = {
          client_id: config.spotifyOAuth2ClientId,
          redirect_uri: `${window.location.origin}${routes.spotifyOAuth2InvalidClientCallback.path()}`,
          grant_type: 'authorization_code',
          code: paramsObject.code,
          code_verifier: 'invalid_code_verifier',
          // code_verifier: codeVerifier,
        };
        const payload = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(params),
        } as const;
        setTokenRequestBody(
          (() => {
            return {
              ...params,
              client_id: '************(masked)',
              code: '************(masked)',
            };
          })()
        );

        (async () => {
          const body = await fetch(spotifyEndpoints.tokenEndpoint, payload);
          const json = (await body.json()) as SpotifyTokenEndpointResponse;
          if ('error' in json) {
            setTokenResult(json);
            oauth2StateStore.flush();
            codeVerifierStore.flush();
            authTokenStore.flush();
            return;
          }

          const expiresIn = json.expires_in;
          if (expiresIn === undefined) {
            setTokenResult(json);
            oauth2StateStore.flush();
            codeVerifierStore.flush();
            authTokenStore.flush();
            return;
          }

          const accessToken = json.access_token;
          if (accessToken === undefined) {
            setTokenResult(json);
            oauth2StateStore.flush();
            codeVerifierStore.flush();
            authTokenStore.flush();
            return;
          }

          setTokenResult({
            ...json,
            access_token: '************(masked)',
            refresh_token: '************(masked)',
          });
          return;
        })();

        return () => {
          oauth2StateStore.flush();
          codeVerifierStore.flush();
        };
      });
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
    routes.spotifyOAuth2InvalidClientCallback,
  ]);

  const onBack = useCallback(() => {
    navigate(routes.auth.path());
  }, [navigate, routes.auth]);

  return {
    onBack,
    tokenResult,
    tokenRequestBody,
    expectedPKCEParams,
  };
};
