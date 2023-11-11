import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import { handleInput } from "~/lib/handleSpeech";
import { AppRouter } from "~/util/constants/appRoutes";
import { AboutPage, ConversationPage, HomePage, SettingPage } from "./pages";

export default function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [text, setText] = useState<string>("");
  const [resultNews, setResultNews] = useState<any[]>([]);
  const [currentCommand, setCurrentCommand] = useState<any>();
  const [isListening, setIsListening] = useState(false);
  const [isStop, setIsStop] = useState(true);

  useEffect(() => {
    if (isStop) {
      window.electron.keywordRecognize().then((res) => {
        if (res) {
          console.log("30", res);
          setIsListening(true);
        }
      });
    }
  }, [isStop]);

  useEffect(() => {
    if (isListening) {
      setIsStop(false);
      console.log("Start background listen");

      window.electron.backgroundListen((result: string) => {
        setText(result);
        handleInput(result, currentCommand, resultNews).then((res) => {
          console.log(`New result: ${res.result}`);
          console.log(`Old result: ${resultNews}`);
          if (res.command && res.result) {
            setCurrentCommand(res.command);
            setResultNews(res.result);
          }
        });
      });
    } else {
      window.electron.stopBackgroundListen();
      setIsStop(true);
    }

    return () => {
      window.electron.stopBackgroundListen();
    };
  }, [isListening, resultNews, currentCommand]);

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <CssBaseline />
        <div className="gradient-dark">
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
    </ThemeProvider>
  );
}
