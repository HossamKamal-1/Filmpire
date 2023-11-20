import { createTheme, useMediaQuery, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
// Themes
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4C29',
    },
    secondary: {
      main: '#008170',
      contrastText: '#f198f',
    },
    background: {
      paper: '#082032',
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
const ColorModeProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('color-mode')) ?? prefersDarkMode
  );
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem('color-mode', !prevMode);
      return !prevMode;
    });
  };
  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );
  return (
    <ColorModeContext.Provider value={{ toggleColorMode: toggleDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export { ColorModeContext };
export default ColorModeProvider;
