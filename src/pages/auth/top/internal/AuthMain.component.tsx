import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';

import { Button } from '@/features/ui/Button';

import { useAuthMain } from './AuthMain.hooks.ts';

export const AuthMain = () => {
  const { onClick, onSnackBarClose, isSnackbarOpen, snackbarMessage } =
    useAuthMain();
  return (
    <>
      <Button onClick={onClick}>Auth main</Button>
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
