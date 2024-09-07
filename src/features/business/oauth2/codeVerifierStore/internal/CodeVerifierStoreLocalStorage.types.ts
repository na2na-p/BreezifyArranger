export type EventType = 'change';
export type Listener = (codeVerifier: string | null) => void | Promise<void>;

export type CodeVerifierStore = {
  get(): string | null;

  set(token: string): void;

  flush(): void;

  addEventListener: (type: EventType, listener: Listener) => void;
  removeEventListener: (type: EventType, listener: Listener) => void;
};

export type GetCodeVerifierStore = () => CodeVerifierStore;
