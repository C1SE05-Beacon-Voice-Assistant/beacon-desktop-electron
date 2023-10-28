import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
=======
import { Route, Routes} from "react-router-dom";
>>>>>>> automatic_update
import MainLayout from "~/layouts/MainLayout";
import { AppRouter } from "~/util/constants/appRoutes";
import { AboutPage, ConversationPage, HomePage, SettingPage } from "./pages";

const queryClient = new QueryClient();

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <CssBaseline />
          <div className="gradient-dark">
            <Routes>
<<<<<<< HEAD
              <Route path={AppRouter.HOME} element={<HomePage />} />
              <Route
                path={AppRouter.CONVERSATION}
                element={<ConversationPage />}
              />
              <Route path={AppRouter.SETTING} element={<SettingPage />} />
              <Route path={AppRouter.ABOUT_TEAM} element={<AboutPage />} />
=======
                <Route path={AppRouter.HOME} element={<HomePage />} />
                <Route
                  path={AppRouter.CONVERSATION}
                  element={<ConversationPage />}
                />
                <Route path={AppRouter.SETTING} element={<SettingPage />} />
                <Route path={AppRouter.ABOUT_TEAM} element={<AboutPage />} />
>>>>>>> automatic_update
            </Routes>
          </div>
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
