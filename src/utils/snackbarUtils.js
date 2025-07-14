let enqueueSnackbarRef;

export const setEnqueueSnackbar = (enqueueSnackbar) => {
  enqueueSnackbarRef = enqueueSnackbar;
};

export const showToast = (type, message) => {
  if (enqueueSnackbarRef) {
    enqueueSnackbarRef(message, { variant: type });
  } else {
    console.warn("Snackbar not initialized yet.");
  }
};
