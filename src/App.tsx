import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { createTheme, CssBaseline } from "@mui/material";
import "@fontsource/open-sans";
import "@fontsource/open-sans/800.css";
import "@fontsource/open-sans/600.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/system";
import HomePage from "./pages/home";
import { AppRouter } from "./components/constants/app-routes";
import ConversitionHistory from "./pages/conversition-history";
import MainLayout from "./layouts/main/main-layout";
import SettingPage from "./pages/setting";
import AboutTeam from "./pages/about-team";

const queryClient = new QueryClient();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

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
                path={AppRouter.COVERSITION_HISTORY}
                element={<ConversitionHistory />}
              />
              <Route path={AppRouter.SETTING} element={<SettingPage />} />
              <Route path={AppRouter.ABOUT_TEAM} element={<AboutTeam />} />
            </Routes>
          </div>
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
