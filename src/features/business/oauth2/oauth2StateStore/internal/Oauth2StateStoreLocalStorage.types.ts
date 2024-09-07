export type EventType = 'change';
export type Listener = (oauth2State: string | null) => void | Promise<void>;

export type Oauth2StateStore = {
  get(): string | null;

  set(token: string): void;

  flush(): void;

  addEventListener: (type: EventType, listener: Listener) => void;
  removeEventListener: (type: EventType, listener: Listener) => void;
};

export type GetOauth2StateStore = () => Oauth2StateStore;
