import { isNil } from 'es-toolkit';

import type {
  AuthTokenStore,
  EventType,
  Listener,
  OAuth2Token,
} from './AuthTokenStoreLocalStorage.types.ts';

const OAUTH_TOKEN_KEY = 'applicantToken';

class AuthTokenStoreLocalStorageClass implements AuthTokenStore {
  private listeners: Record<EventType, ReadonlyArray<Listener>> = {
    change: [],
  };

  // HACK: useSyncExternalStoreが等価評価をObject.isで行うので無理
  // 解消するには状態管理にLocalStorage使うのをやめる
  public getForSyncExternalStore() {
    const token = localStorage.getItem(OAUTH_TOKEN_KEY);
    if (isNil(token)) {
      return null;
    }
    return token;
  }

  public get() {
    const token = localStorage.getItem(OAUTH_TOKEN_KEY);
    if (isNil(token)) {
      return null;
    }
    return JSON.parse(token);
  }

  public set(token: OAuth2Token) {
    localStorage.setItem(OAUTH_TOKEN_KEY, JSON.stringify(token));
    this.dispatch('change');
  }

  public flush() {
    localStorage.removeItem(OAUTH_TOKEN_KEY);
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

export default AuthTokenStoreLocalStorageClass;
