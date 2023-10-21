import { useState } from "react";
import bot from "~/assets/bot.png";
import vector from "~/assets/vector.svg";
import styles from "./HomePage.module.css";
import microphone from "~/assets/microphone.png";

export default function HomePage() {
  const [isStart, setIsStart] = useState<boolean | null>(false);
  // console.log(window.electron.recognizeFromMicrophone);

  // const handleStart = () => {
  //   setIsStart(true);
  //   window.electron
  //     .recognizeFromMicrophone()
  //     .then((text: string) => {
  //       // Process the recognized text
  //       console.log(text);
  //     })
  //     .catch((error: any) => {
  //       console.error("Error: " + error);
  //     });
  // };

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
        {/*<<<<<<< HEAD*/}
        {/* {!isStart && <button onClick={window.electron.wakeUp}>Bắt đầu!</button>} */}
        {!isStart && <button onClick={() => setIsStart(true)}>Bắt đầu!</button>}
        {/*=======*/}
        {/*        <button onClick={handleStart}>Bắt đầu!</button>*/}
        {/* {!isStart && <button onClick={handleStart}>Bắt đầu!</button>} */}
        {/*>>>>>>> 075329761dec9b9f76822d85d90c09c3bf4356dc*/}
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
