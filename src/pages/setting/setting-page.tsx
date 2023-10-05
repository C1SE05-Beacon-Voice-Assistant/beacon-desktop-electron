import Bot from "~/components/bot/bot";
import styles from "./setting.module.css";
export default function SettingPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.setting__container}>
          <div className="">
            <h1>Cài đặt</h1>
          </div>
          <div className={styles.setting__option}>
            <h1>Cài đặt chung</h1>
            <div className={styles["setting__option--detail"]}>
              <div className={styles.item}>
                <h3>Đầu vào (micro)</h3>
                <button>Micro Array 1</button>
              </div>
              <div className={styles.item}>
                <h3>Đầu ra (Speaker)</h3>
                <button>Micro Array 1</button>
              </div>
              <div className={styles.item}>
                <h3>Âm lượng chung</h3>
                <button>Micro Array 1</button>
              </div>
            </div>
          </div>
          <div className={styles.setting__option}>
            <h1>Phiên bản </h1>
            <div className={styles["setting__option--detail"]}>
              <div className={styles.item}>
                <h3>Version 1.1.12</h3>
                <button>Kiểm tra</button>
              </div>
            </div>
          </div>
        </div>
        <Bot />
      </div>
    </>
  );
}
