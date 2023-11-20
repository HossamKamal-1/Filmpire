import { useContext } from 'react';
import { SnackbarContext } from './SnackbarContext';

export const useOpenSnackbar = () => useContext(SnackbarContext);
