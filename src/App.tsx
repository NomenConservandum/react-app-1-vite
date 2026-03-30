import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box, CircularProgress } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { darkTheme, lightTheme } from "./theme/theme";
import { routes } from "./routes";
import { checkAuth } from "./store/user/thunks";
import type { AppDispatch } from "./store/store";
import { CommonWrapper } from "./wrappers/CommonWrapper";

export const ColorModeContext = createContext({
  toggleTheme: () => { }
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(checkAuth());
      }
      setIsInit(true);
    };
    init();
  }, [dispatch]);

  if (!isInit) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <CommonWrapper>
          <Routes>
            {routes.map(router => (
              <Route key={router.path + router.label} path={router.path} element={router.element} />
            ))}
          </Routes>
        </CommonWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;