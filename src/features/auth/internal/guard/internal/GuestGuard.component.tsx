import { useNavigate } from 'react-router-dom';

import { getRoutes } from '@/features/routes';

import GuardBase from './GuardBase.component';
import { isGuest } from '../../utils/isAuthorized';

/**
 * 非ログイン時のみ表示できる画面で使用
 */
const GuestGuard = () => {
  const routes = getRoutes();
  const navigate = useNavigate();

  return (
    <GuardBase
      guardPredicate={isGuest}
      onRejected={() => navigate(routes.listPlaylist.getPath())}
    />
  );
};

export default GuestGuard;
