import { isNil } from 'es-toolkit';

import type {
  CodeVerifierStore,
  EventType,
  Listener,
} from './CodeVerifierStoreLocalStorage.types';

const CODE_VERIFIER_KEY = 'code_verifier';

class CodeVerifierStoreLocalStorageClass implements CodeVerifierStore {
  private listeners: Record<EventType, ReadonlyArray<Listener>> = {
    change: [],
  };

  public get() {
    const token = localStorage.getItem(CODE_VERIFIER_KEY);
    if (isNil(token)) {
      return null;
    }
    return JSON.parse(token);
  }

  public set(token: string) {
    localStorage.setItem(CODE_VERIFIER_KEY, JSON.stringify(token));
    this.dispatch('change');
  }

  public flush() {
    localStorage.removeItem(CODE_VERIFIER_KEY);
    this.dispatch('change');
  }

  public addEventListener(type: EventType, listener: Listener) {
    this.listeners[type] = [...this.listeners[type], listener];
  }

  public removeEventListener(type: EventType, listener: Listener) {
    this.listeners[type] = this.listeners[type].filter(
      needle => needle !== listener
    );
  }

  private dispatch(type: EventType) {
    const value = this.get();
    for (const listener of this.listeners[type]) {
      setTimeout(() => listener(value), 0);
    }
  }
}

export default CodeVerifierStoreLocalStorageClass;
