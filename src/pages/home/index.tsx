import { useState } from "react";
import bot from "~/assets/bot.png";
import vector from "~/assets/vector.png";
import styles from "./HomePage.module.css";

import microphone from "~/assets/microphone.png";
export default function HomePage() {
  const [isStart, setIsStart] = useState<Boolean | null>(false);
  return (
    <section className={styles.home__container}>
      <div className={styles.bot}>
        <img src={bot} alt={bot} />
      </div>
      <div className={styles.vector}>
        <img src={vector} alt={vector} />
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
        {!isStart && <button onClick={() => setIsStart(true)}>Bắt đầu!</button>}
        <textarea name="text" id="text"></textarea>
        <button id="btn" onClick={window.electron.sendToPython}>
          Bắt đầu!
        </button>
      </div>
      {isStart && (
        <div className={styles.container}>
          <div className={styles.microphone}>
            <img src={microphone} alt="" />
          </div>
          <div className={`${styles.circle} ${styles["circle-a"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-b"]}`}></div>
          <div className={`${styles.circle} ${styles["circle-c"]}`}></div>
        </div>
      )}
    </section>
  );
}
