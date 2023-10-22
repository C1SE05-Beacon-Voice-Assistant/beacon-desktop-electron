import { InputHTMLAttributes, useState } from "react";
import bot from "~/assets/bot.png";
import vector from "~/assets/vector.svg";
import styles from "./HomePage.module.css";
import microphone from "~/assets/microphone.png";

export default function HomePage() {
  const [isStart, setIsStart] = useState<boolean | null>(false);

  const handleInput = (e: any) => {
    const text = (document.getElementById("input") as any)?.value;

    window.electron.outputFromUser(text);
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
        <input
          type="text"
          id="input"
          style={{
            display: "block",
          }}
        />
        <button type="button" onClick={handleInput}>
          Nhập
        </button>
        {/* <button onClick={handleStart}>Bắt đầu!</button> */}
        {/* {!isStart && <button onClick={handleStart}>Bắt đầu!</button>} */}
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
