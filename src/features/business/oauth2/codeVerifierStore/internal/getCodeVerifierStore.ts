import singleton from '@/features/utils/singleton.ts';

import CodeChallengeStoreLocalStorage from './CodeVerifierStoreLocalStorage.class';
import type { GetCodeVerifierStore } from './CodeVerifierStoreLocalStorage.types';


const createCodeVerifierStore = () => new CodeChallengeStoreLocalStorage();
const getCodeVerifierStore: GetCodeVerifierStore = singleton(
  createCodeVerifierStore
);

export default getCodeVerifierStore;

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('returns identical object', () => {
    const first = getCodeVerifierStore();
    const second = getCodeVerifierStore();

    expect(first).toBe(second);
  });
}
