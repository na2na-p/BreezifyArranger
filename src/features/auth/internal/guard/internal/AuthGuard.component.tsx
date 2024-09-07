import { useLocation, useNavigate } from 'react-router-dom';

import { getRoutes } from '@/features/routes';

import GuardBase from './GuardBase.component';
import { isAuthorized } from '../../utils/isAuthorized';

/**
 * Spotifyの認証が済んでいない場合にログインページにリダイレクトするガードコンポーネント
 */
const AuthGuard = () => {
  const routes = getRoutes();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <GuardBase
      guardPredicate={isAuthorized}
      onRejected={() =>
        navigate(routes.auth.getPath(), { state: { from: currentPath } })
      }
    />
  );
};

export default AuthGuard;
