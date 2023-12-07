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
        <div style={{ textAlign: 'center', width: '80%', margin: '0 auto'}}>{content ? content : "content content contentcontentcontentcontentcontent "}</div>
        </div>
      </div>
      <div className={styles.container}>
          <div className={styles.microphone}>
            <img src={microphone} alt={microphone} />
          </div>
          <div className={`${styles.circle} ${styles["circle-a"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-b"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-c"]}`}></div>
        </div>
    </section>
  );
}
