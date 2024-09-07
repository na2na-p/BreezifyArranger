import type { ButtonProps } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

export const Button = ({
  children,
  variant = 'contained',
  ...rest
}: ButtonProps) => {
  return (
    <MuiButton variant={variant} {...rest}>
      {children}
    </MuiButton>
  );
};
