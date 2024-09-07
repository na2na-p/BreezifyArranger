import singleton from '@/features/utils/singleton.ts';

import AuthTokenStoreLocalStorage from './AuthTokenStoreLocalStorage.class';
import type { GetAuthTokenStore } from './AuthTokenStoreLocalStorage.types';

const createAuthTokenStore = () => new AuthTokenStoreLocalStorage();
const getAuthTokenStore: GetAuthTokenStore = singleton(createAuthTokenStore);

export default getAuthTokenStore;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('returns identical object', () => {
    const first = getAuthTokenStore();
    const second = getAuthTokenStore();

    expect(first).toBe(second);
  });
}
