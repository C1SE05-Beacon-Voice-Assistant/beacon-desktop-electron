import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect, useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import handleInput from "~/lib/handleSpeech";
import { AppRouter } from "~/util/constants/appRoutes";
import { AboutPage, ConversationPage, HomePage, SettingPage } from "./pages";
export const ContentContext = createContext("");
export default function App() {
  const [content, setContent] = useState("");
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [history, setHistory] = useState<object[]>([]);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    window.electron.backgroundListen(
      (result: string) => {
        handleInput(result, history, list).then((res: any) => {
          if (res?.type === "gpt_ai") {
            setHistory((prev) => [...prev, ...res.query]);
          } else if (res?.result?.newsList) {
            const newsList = res.result.newsList;
            setList(newsList); //if the label is read_news related, set new articles list
            console.log("data: ", newsList);
          }
        });
      },
      (text: string) => setContent(text)
    );
    console.log("state: ", list);

    return () => {
      window.electron.stopBackgroundListen();
    };
  }, [list, history]);

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <CssBaseline />
        <div className="gradient-dark">
          <Routes>
            <Route
              path={AppRouter.HOME}
              element={
                <ContentContext.Provider value={content}>
                  <HomePage />
                </ContentContext.Provider>
              }
            />
            <Route
              path={AppRouter.CONVERSATION}
              element={<ConversationPage />}
            />
            <Route path={AppRouter.SETTING} element={<SettingPage />} />
            <Route path={AppRouter.ABOUT_TEAM} element={<AboutPage />} />
          </Routes>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
}
