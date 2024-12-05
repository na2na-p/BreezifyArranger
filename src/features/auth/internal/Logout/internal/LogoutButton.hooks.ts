import { useCallback } from 'react';

import { getAuthTokenStore } from '@/features/auth';

export const useLogoutButton = () => {
  const authTokenStore = getAuthTokenStore();
  const onClick = useCallback(() => {
    authTokenStore.flush();
  }, [authTokenStore]);
  return { onClick };
};
