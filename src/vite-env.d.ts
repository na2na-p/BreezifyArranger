/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_SPOTIFY_OAUTH2_CLIENT_ID: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
