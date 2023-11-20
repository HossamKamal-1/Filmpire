import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useMemo, useState } from 'react';
export const SnackbarContext = createContext({
  openSnackbar: () => {},
});
const SnackbarProvider = ({ children }) => {
  const [snackbarOptions, setSnackbarOptions] = useState({
    isOpen: false,
    autoHideDuration: 6000,
    variant: 'success',
    message: '',
  });
  const openSnackbar = useCallback(
    (message = '', variant = 'success', autoHideDuration = 6000) => {
      setSnackbarOptions({
        isOpen: true,
        variant,
        message,
        autoHideDuration,
      });
    },
    []
  );
  // const openSnackbar = (
  //   message = '',
  //   variant = 'success',
  //   autoHideDuration = 6000
  // ) => {
  //   setSnackbarOptions({
  //     isOpen: true,
  //     variant,
  //     message,
  //     autoHideDuration,
  //   });
  // };
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOptions((prevOptions) => ({ ...prevOptions, isOpen: false }));
  };
  const contextValue = useMemo(() => ({ openSnackbar }), [openSnackbar]);
  return (
    <SnackbarContext.Provider value={contextValue}>
      <Snackbar
        open={snackbarOptions.isOpen}
        autoHideDuration={snackbarOptions.autoHideDuration}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarOptions.variant}
          sx={{ width: '100%' }}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
export default SnackbarProvider;
