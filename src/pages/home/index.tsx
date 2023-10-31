import { useEffect, useState } from "react";
import bot from "~/assets/bot.png";
import microphone from "~/assets/microphone.png";
import vector from "~/assets/vector.svg";
import { handleInput } from "~/lib/handleSpeech";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [isStart, setIsStart] = useState<boolean | null>(false);
  const [resultNews, setResultNews] = useState<any[]>([]);
  const [currentCommand, setCurrentCommand] = useState<any>();

  // useEffect(() => {
  //   window.electron.backgroundListen((result: string) => {
  //     handleInput(result, currentCommand, resultNews).then((res) => {
  //       console.log(`New result: ${res.result}`);
  //       console.log(`Old result: ${resultNews}`);
  //       if (res.command && res.result) {
  //         setCurrentCommand(res.command);
  //         setResultNews(res.result);
  //       }
  //     });
  //   });

  //   return () => {
  //     window.electron.stopBackgroundListen();
  //   };
  // }, [resultNews, currentCommand]);
  const handleTest = () => {
    const { value } = document.querySelector(
      'input[name="in"]'
    ) as HTMLInputElement;

    handleInput(value, currentCommand, resultNews).then((res) => {
      console.log(`New result: `, res.result);
      console.log(`Old result: `, resultNews);
      if (res.command && res.result) {
        setCurrentCommand(res.command);
        setResultNews(res.result);
      }
    });
  };
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
          {isStart ? (
            <p>Xin chào, Tiên</p>
          ) : (
            <p>
              Xin chào! Tôi có thể giúp gì <br></br> cho bạn?
            </p>
          )}
        </div>
        {/* <button onClick={handleStart}>Bắt đầu!</button> */}
        {/* {!isStart && <button onClick={handleStart}>Bắt đầu!</button>} */}
        <input type="text" name="in" />
        <button onClick={handleTest}>Test</button>
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
