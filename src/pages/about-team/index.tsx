import Bot from "~/components/bot";
import styles from "./AboutTeam.module.css";
import QuocBao from "~/assets/qb.svg";
import QuocThang from "~/assets/qt.svg";
import TrieuTien from "~/assets/tt.svg";
import ThiThao from "~/assets/ttt.svg";
import VanVi from "~/assets/vv.svg";

export default function AboutTeam() {
  return (
    <>
      <div className={styles["about__team--container"]}>
        <div className={styles["about__team--info"]}>
          <h1>Thông Tin</h1>
          <div className={styles["about__team-description"]}>
            <p>
              Chúng tôi đang phát triển ứng dụng "Beacon" dành cho người sử dụng
              trên hệ điều hành Windows 10 và Windows 11. Ứng dụng này có các
              tính năng cho phép người dùng giao tiếp với trợ lý, tìm kiếm và
              đọc báo, nghe nhạc, cũng như cung cấp hướng dẫn sử dụng ứng dụng.
              Đây là một phần mềm dành cho người khiếm thị và những người có nhu
              cầu sử dụng trợ lý giọng nói.
            </p>
          </div>
        </div>
        <div className={styles["about__team--info"]}>
          <h1>Về chúng tôi</h1>
          <div
            className={`${styles["about__team--section"]} ${styles["about__team--description"]}`}
          >
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={QuocThang} alt="" />
                </div>
                <div className={styles["full-name"]}>Trương Quốc Thắng</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={QuocBao} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={TrieuTien} alt="" />
                </div>
                <div className={styles["full-name"]}>Nguyễn Triều Tiên</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={ThiThao} alt="" />
                </div>
                <div className={styles["full-name"]}>Thân Thị Thảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={VanVi} alt="" />
                </div>
                <div className={styles["full-name"]}>Nguyễn Văn Vĩ</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["about__team--cpright"]}>
          <h3>C1SE.05 - Trường Đạo tạo Quốc Tế - Đại học Duy Tân</h3>
        </div>
      </div>
      <Bot isShowIcon={false} />
    </>
  );
}
