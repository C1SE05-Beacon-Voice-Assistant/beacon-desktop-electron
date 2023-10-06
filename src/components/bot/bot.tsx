import styles from "./Bot.module.css";
import BotImage from "~/assets/bot.png";
import Vector from "~/assets/vector.png";

export default function Bot() {
  return (
    <div className={styles.bot}>
      <img className="icon" src={BotImage} alt="" />
      <img className={styles.vector} src={Vector} alt="" />
    </div>
  );
}
