import bot from "~/assets/bot.png";
import styles from "./Coversation.module.css";
import Bot from "~/components/bot/Bot";
export default function ConversitionHistory() {
  return (
    <div className={styles.container}>
      <div className="body">
        <h1>Lịch Sử</h1>
        <div className={styles.content}>
          <div className={styles.time}>Hôm nay</div>
          <div className={styles.conversion}>
            <img src={bot} alt="" />
            <div className={styles.message}>
              Tôi muốn nghe nhạc trên youtube
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.time}>Hôm nay</div>
          <div className={styles.conversion}>
            <img src={bot} alt="" />
            <div className={styles.message}>
              Tôi muốn nghe nhạc trên youtube
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.time}>Hôm nay</div>
          <div className={styles.conversion}>
            <img src={bot} alt="" />
            <div className={styles.message}>
              Tôi muốn nghe nhạc trên youtube
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.time}>Hôm nay</div>
          <div className={styles.conversion}>
            <img src={bot} alt="" />
            <div className={styles.message}>
              Tôi muốn nghe nhạc trên youtube
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.time}>Hôm nay</div>
          <div className={styles.conversion}>
            <img src={bot} alt="" />
            <div className={styles.message}>
              Tôi muốn nghe nhạc trên youtube
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bot}>
        <Bot />
      </div>
    </div>
  );
}
