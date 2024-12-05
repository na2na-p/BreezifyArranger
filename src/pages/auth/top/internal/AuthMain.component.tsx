import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar, Stack } from '@mui/material';

import { Button } from '@/features/ui/Button';

import { useAuthMain } from './AuthMain.hooks.ts';

export const AuthMain = () => {
  const {
    onClick,
    onDemoClick,
    onSnackBarClose,
    isSnackbarOpen,
    snackbarMessage,
  } = useAuthMain();
  return (
    <>
      <Stack
        sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
        spacing={2}
      >
        <Button onClick={onClick}>Auth main</Button>
        <Button onClick={onDemoClick}>
          Demo: authorization code interception attack (attacker Client Role)
        </Button>
      </Stack>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message={snackbarMessage}
        onClose={onSnackBarClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onSnackBarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};
