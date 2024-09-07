import { isNil } from 'es-toolkit';

import type {
  EventType,
  Listener,
  Oauth2StateStore,
} from './Oauth2StateStoreLocalStorage.types.ts';

const OAUTH2_STATE_KEY = 'oauth2_state';

class Oauth2StateStoreLocalStorageClass implements Oauth2StateStore {
  private listeners: Record<EventType, ReadonlyArray<Listener>> = {
    change: [],
  };

  public get() {
    const oauth2State = localStorage.getItem(OAUTH2_STATE_KEY);
    if (isNil(oauth2State)) {
      return null;
    }
    return JSON.parse(oauth2State);
  }

  public set(oauth2State: string) {
    localStorage.setItem(OAUTH2_STATE_KEY, JSON.stringify(oauth2State));
    this.dispatch('change');
  }

  public flush() {
    localStorage.removeItem(OAUTH2_STATE_KEY);
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

export default Oauth2StateStoreLocalStorageClass;
