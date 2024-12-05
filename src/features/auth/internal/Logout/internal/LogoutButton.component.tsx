import { Button } from '@/features/ui/Button';

import { useLogoutButton } from './LogoutButton.hooks';
import type { LogoutButtonProps } from './LogoutButton.types.ts';

export const LogoutButton = ({
  variant = 'outlined',
  color = 'white',
}: LogoutButtonProps) => {
  const { onClick } = useLogoutButton();
  return (
    <Button
      variant={variant}
      sx={{
        color,
      }}
      onClick={onClick}
    >
      Logout
    </Button>
  );
};
