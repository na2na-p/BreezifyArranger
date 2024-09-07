import type { OAuth2Token } from '../../AuthTokenStore';

export type UseGuardProps = {
  guardPredicate: (authorizationToken: OAuth2Token | null) => boolean;
  onRejected: () => void;
};
