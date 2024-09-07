import type { OAuth2Token } from '../../../AuthTokenStore';

export const isAuthorized = (
  authorizationToken: OAuth2Token | null,
  now?: number
): boolean => {
  if (!authorizationToken) {
    return false;
  }

  return (now ?? Date.now()) < authorizationToken.expiresAt;
};

export const isGuest = (
  oauth2Token: OAuth2Token | null,
  now?: number
): boolean => {
  return !isAuthorized(oauth2Token, now);
};
