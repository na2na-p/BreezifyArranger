export type OAuth2Token = {
  accessToken: string;
  expiresAt: number;
};

export type EventType = 'change';
export type Listener = (token: OAuth2Token | null) => void | Promise<void>;

export type AuthTokenStore = {
  getForSyncExternalStore(): string | null;
  get(): OAuth2Token | null;
  set(token: OAuth2Token): void;
  flush(): void;

  addEventListener: (type: EventType, listener: Listener) => void;
  removeEventListener: (type: EventType, listener: Listener) => void;
};

export type GetAuthTokenStore = () => AuthTokenStore;
