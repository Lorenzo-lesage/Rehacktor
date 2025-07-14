import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { setEnqueueSnackbar } from '../../utils/snackbarUtils';

const SnackbarInitializer = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setEnqueueSnackbar(enqueueSnackbar);
  }, [enqueueSnackbar]);

  return null;
};

const SnackbarProviderWrapper = ({ children }) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={3000}
  >
    <SnackbarInitializer />
    {children}
  </SnackbarProvider>
);

export default SnackbarProviderWrapper;
