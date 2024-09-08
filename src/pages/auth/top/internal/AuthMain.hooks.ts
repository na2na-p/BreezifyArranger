import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getCodeVerifierStore } from '@/features/business/oauth2/codeVerifierStore';
import { createCodeChallenge } from '@/features/business/oauth2/createCodeChallenge';
import { createCodeVerifier } from '@/features/business/oauth2/createCodeVerifier';
import { createState } from '@/features/business/oauth2/createState';
import { getOauth2StateStore } from '@/features/business/oauth2/oauth2StateStore';
import { spotifyEndpoints } from '@/features/business/spotify/endpoints.ts';
import { getConfig } from '@/features/config';
import { getRoutes } from '@/features/routes';

import { OAUTH2_SCOPES } from './AuthMain.constaints.ts';

export const useAuthMain = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const config = getConfig();
  const routes = getRoutes();
  const location = useLocation();
  const redirectUri = `${window.location.origin}${routes.spotifyOAuth2Callback.path()}`;
  const codeVerifierStore = getCodeVerifierStore();
  const oauth2StateStore = getOauth2StateStore();

  // NOTE: Callbackでparamの検証の結果失敗した場合にerrorが来る
  useEffect(() => {
    const paramsObject = location.state as {
      error?: string;
    };

    if (paramsObject?.error) {
      setIsSnackbarOpen(true);
      setSnackbarMessage(paramsObject.error);
    }
  }, [location.search, location.state]);

  const onSnackBarClose = useCallback(() => {
    setIsSnackbarOpen(false);
    setSnackbarMessage('');
  }, []);

  const onClick = useCallback(async () => {
    const codeVerifier = createCodeVerifier();
    codeVerifierStore.set(codeVerifier);
    const codeChallenge = await createCodeChallenge(codeVerifier);
    const state = createState();
    oauth2StateStore.set(state);

    const requestParams = {
      response_type: 'code',
      client_id: config.spotifyOAuth2ClientId,
      scope: OAUTH2_SCOPES.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      state,
      redirect_uri: redirectUri,
    } as const;

    const queryString = new URLSearchParams(requestParams).toString();
    window.location.href = `${spotifyEndpoints.oauth2Endpoint}?${queryString}`;
  }, [
    codeVerifierStore,
    config.spotifyOAuth2ClientId,
    oauth2StateStore,
    redirectUri,
  ]);

  return { onClick, onSnackBarClose, isSnackbarOpen, snackbarMessage } as const;
};
