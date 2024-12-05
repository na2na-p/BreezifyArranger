import { Button } from '@/features/ui/Button';

import { useSpotifyOAuth2InvalidClientCallback } from './SpotifyOAuth2InvalidClientCallback.hooks';

/**
 * NOTE: 不正なクライアントが認可コード横取りしたというデモ用のコールバックページ
 */
export const SpotifyOAuth2InvalidClientCallback = () => {
  const { onBack, tokenRequestBody, tokenResult, expectedPKCEParams } =
    useSpotifyOAuth2InvalidClientCallback();
  return (
    <>
      <h1>Result</h1>
      <h2></h2>
      <h3>
        {
          // tokenResultがnullの場合、またはerrorプロパティがある場合はFail、それ以外はSuccess
          !tokenResult || 'error' in tokenResult ? 'Fail' : 'Success'
        }
      </h3>
      <h2>PKCE Params</h2>
      <pre>{JSON.stringify(expectedPKCEParams, null, 2)}</pre>
      <h2>Token requestBody</h2>
      <pre>{JSON.stringify(tokenRequestBody, null, 2)}</pre>
      <h2>Token Response</h2>
      <pre>{JSON.stringify(tokenResult, null, 2)}</pre>
      <Button onClick={onBack}>Return</Button>
    </>
  );
};
