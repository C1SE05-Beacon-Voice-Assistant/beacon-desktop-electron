import { useEffect, useState } from "react";
import Bot from "~/components/bot";
import styles from "./setting.module.css";
import { getDevice } from "~/lib/getDevice";

export default function SettingPage() {
  const [devices, setDevices] = useState<any>(null);

  useEffect(() => {
    getDevice().then((res) => {
      setDevices(res);
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.setting__container}>
          <div className={styles.title}>
            <h1>Cài đặt</h1>
          </div>
          <div className={styles.setting__content}>
            <div className={styles.setting__option}>
              <h1>Cài đặt chung</h1>
              <div className={styles["setting__option--detail"]}>
                <div className={styles.item}>
                  <h3>Đầu vào (micro)</h3>
                  <select>
                    {devices?.inputDevices &&
                      devices?.inputDevices.map(
                        (device: any, index: number) => (
                          <option key={index}>{device.name}</option>
                        )
                      )}
                  </select>
                </div>
                <div className={styles.item}>
                  <h3>Đầu ra (Speaker)</h3>
                  <select>
                    {devices?.outputDevices &&
                      devices?.outputDevices.map(
                        (device: any, index: number) => (
                          <option key={index}>{device.name}</option>
                        )
                      )}
                  </select>
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
        </div>
        <Bot marginLeft={true} />
      </div>
    </>
  );
}
