import { useContext, useEffect, useState } from "react";
import bot from "~/assets/bot.png";
import microphone from "~/assets/microphone.png";
import vector from "~/assets/vector.svg";

import styles from "./HomePage.module.css";
import { ContentContext } from "~/App";

export default function HomePage() {
  const content = useContext(ContentContext);
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
        <div style={{ textAlign: 'center', width: '80%', margin: '0 auto'}}>{content}</div>
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
