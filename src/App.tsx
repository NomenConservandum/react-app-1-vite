import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import { routes } from "./routes";
import { CommonWrapper } from "./wrappers/CommonWrapper";
import { AuthWrapper } from "./wrappers/AuthWrapper";

export const ColorModeContext = createContext({
  toggleTheme: () => { }
});

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <CommonWrapper>
          <AuthWrapper>
            <Routes>
              {routes.map(router => (
                <Route key={router.path + router.label} path={router.path} element={router.element} />
              ))}
            </Routes>
          </AuthWrapper>
        </CommonWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;