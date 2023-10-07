import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";

import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppRouter } from "./constants/appRoutes";
import MainLayout from "./layouts/MainLayout";
import { AboutPage, ConversationPage, HomePage, SettingPage } from "./pages";

const queryClient = new QueryClient();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <CssBaseline />
          <div className={isDarkMode ? "gradient-dark" : "gradient-light"}>
            <Routes>
              <Route path={AppRouter.HOME} element={<HomePage />} />
              <Route
                path={AppRouter.CONVERSATION}
                element={<ConversationPage />}
              />
              <Route path={AppRouter.SETTING} element={<SettingPage />} />
              <Route path={AppRouter.ABOUT_TEAM} element={<AboutPage />} />
            </Routes>
          </div>
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
