import { useEffect, useState } from "react";
import bot from "~/assets/bot.png";
import microphone from "~/assets/microphone.png";
import vector from "~/assets/vector.svg";

import styles from "./HomePage.module.css";
import handleInput from "~/lib/handleSpeech";

export default function HomePage() {
  const [isStart, setIsStart] = useState<boolean | null>(false);
  const [history, setHistory] = useState<object[]>([]);
  const [content, setContent] = useState<string | null>();

  useEffect(() => {
    window.electron.backgroundListen((result: string) => {
      handleInput(result, history).then((res: any) => {
        console.log(res);
        if (res?.label) {
          setIsStart(true);
          setContent(res?.query)
          setHistory((prev) => [...prev, ...res.result]);
        }
      });
    });

    return () => {
      window.electron.stopBackgroundListen();
      setIsStart(false);
    };
  }, [history]);
  return (
    <section className={styles.home__container}>
     <span style={{ textAlign: 'left', width: '30%', position: 'absolute'}}>{content && content}</span>
     <div className={styles.bot__vector}>
        <div className={styles.bot}>
          <img src={bot} alt={bot} />
        </div>
        <div className={styles.vector}>
          <img src={vector} alt={vector} />
        </div>
      </div>
      <div className={styles.title}>
        <div>
          {isStart ? (
            <p>Xin chào, Tiên</p>
          ) : (
            <p>
              Xin chào! Tôi có thể giúp gì <br></br> cho bạn?
            </p>
          )}
        </div>
      </div>
      {isStart && (
        <div className={styles.container}>
          <div className={styles.microphone}>
            <img src={microphone} alt={microphone} />
          </div>
          <div className={`${styles.circle} ${styles["circle-a"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-b"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-c"]}`}></div>
        </div>
      )}
    </section>
  );
}
