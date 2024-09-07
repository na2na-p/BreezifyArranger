import singleton from '@/features/utils/singleton.ts';

import AuthTokenStoreLocalStorage from './Oauth2StateStoreLocalStorage.class.ts';
import type { GetOauth2StateStore } from './Oauth2StateStoreLocalStorage.types.ts';


const createOauth2StateStore = () => new AuthTokenStoreLocalStorage();
const getOauth2StateStore: GetOauth2StateStore = singleton(
  createOauth2StateStore
);

export default getOauth2StateStore;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('returns identical object', () => {
    const first = getOauth2StateStore();
    const second = getOauth2StateStore();

    expect(first).toBe(second);
  });
}
