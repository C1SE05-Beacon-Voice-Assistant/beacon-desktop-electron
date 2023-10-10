import bot from "~/assets/bot.png";
import styles from "./coversition.module.css";
import Bot from "~/components/bot";

export default function ConversitionHistory() {
  return (
    <div className={styles.container}>
      <div className="body">
        <h1 className={styles.title}>
          <span>Lịch sử trò chuyện</span>
        </h1>

        <div className={styles["content-wrapper"]}>
          <div className={styles.content}>
            <div className={styles.time}>Hôm nay</div>
            <div className={styles.conversion}>
              <div className={styles.img}>
                <img src={bot} alt="" />
              </div>
              <div className={styles.message}>
                Tôi muốn nghe nhạc trên youtube...
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.time}>Hôm nay</div>
            <div className={styles.conversion}>
              <div className={styles.img}>
                <img src={bot} alt="" />
              </div>
              <div className={styles.message}>
                Tôi muốn nghe nhạc trên youtube...
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.time}>Hôm nay</div>
            <div className={styles.conversion}>
              <div className={styles.img}>
                <img src={bot} alt="" />
              </div>
              <div className={styles.message}>
                Tôi muốn nghe nhạc trên youtube...
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.time}>Hôm nay</div>
            <div className={styles.conversion}>
              <div className={styles.img}>
                <img src={bot} alt="" />
              </div>
              <div className={styles.message}>
                Tôi muốn nghe nhạc trên youtube...
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.time}>Hôm nay</div>
            <div className={styles.conversion}>
              <div className={styles.img}>
                <img src={bot} alt="" />
              </div>
              <div className={styles.message}>
                Tôi muốn nghe nhạc trên youtube...
              </div>
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
