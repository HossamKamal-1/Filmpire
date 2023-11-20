import { useContext } from 'react';
import { ColorModeContext } from './ColorModeContext';

export const useToggleColorMode = () => useContext(ColorModeContext);
