export type SpotifyOAuth2CallbackParams =
  | {
      code: string;
      state: string;
    }
  | {
      error: string;
      state: string;
    };

export type SpotifyTokenEndpointResponse =
  | {
      error: string;
      error_description: string;
    }
  | {
      access_token: string;
      token_type: string;
      scope: string;
      expires_in: number;
      refresh_token?: string;
    };
