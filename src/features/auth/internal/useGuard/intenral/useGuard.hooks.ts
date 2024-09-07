import { useEffect, useMemo, useSyncExternalStore } from 'react';

import type { UseGuardProps } from './useGuard.types.ts';
import { getAuthTokenStore } from '../../AuthTokenStore';

export const useGuard = ({ guardPredicate, onRejected }: UseGuardProps) => {
  const authTokenStore = getAuthTokenStore();
  const oauth2TokenObjectJSONString = useSyncExternalStore(
    callback => {
      authTokenStore.addEventListener('change', callback);
      return () => {
        authTokenStore.removeEventListener('change', callback);
      };
    },
    () => {
      return getAuthTokenStore().getForSyncExternalStore();
    }
  );

  const guardPassed = useMemo(() => {
    if (oauth2TokenObjectJSONString === null) {
      return guardPredicate(null);
    }

    return guardPredicate(JSON.parse(oauth2TokenObjectJSONString));
  }, [guardPredicate, oauth2TokenObjectJSONString]);

  useEffect(() => {
    if (!guardPassed) {
      onRejected();
    }
  }, [guardPassed, onRejected]);

  return {
    guardPassed,
  } as const;
};
