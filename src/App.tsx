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

  const [text, setText] = useState<string>("");
  const [history, setHistory] = useState<object[]>([]);
  const [oldList, setOldList] = useState<any>({}); // only for news

  useEffect(() => {
    window.electron.backgroundListen(
      (result: string) => {
        setText(result);
      },
      (text: string) => setContent(text)
    );

    return () => {
      window.electron.stopBackgroundListen();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    handleInput(text, history, oldList).then((res: any) => {
      if (!isMounted) return;
      if (res?.type === "gpt_ai") {
        setHistory((prev) => [...prev, ...res.query]);
      } else if (res?.result?.newsList) {
        setOldList({
          label: res.result.label,
          newsList: res.result.newsList,
        }); // Using functional update
      }
    });

    return () => {
      isMounted = false;
    };
  }, [text]);

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
