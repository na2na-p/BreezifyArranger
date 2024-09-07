import { Outlet } from 'react-router-dom';

import type { UseGuardProps } from '../../useGuard';
import { useGuard } from '../../useGuard';

/**
 * 認証関連のガード
 *
 * - ガードをパスする場合、子ルートを定義する
 * - ガードをパスしない場合、 onRejected コールバックを実行する
 *
 * @see UseGuardProps.onRejected
 */
const GuardBase = (props: UseGuardProps) => {
  const { guardPassed } = useGuard(props);

  return guardPassed ? <Outlet /> : null;
};

export default GuardBase;
