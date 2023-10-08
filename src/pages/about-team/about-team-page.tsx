import Bot from "~/components/bot/bot";
import styles from "./about-team.module.css";
import teamMember from "~/assets/team-member.svg";
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
              Đây là một phần mềm dành cho người mù và những người muốn kiểm
              soát máy tính của mình.
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
                  <img src={teamMember} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={teamMember} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={teamMember} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={teamMember} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
            <div className={`${styles["about__team--content"]}`}>
              <div className={styles["about__team--detail"]}>
                <div className="avatar">
                  <img src={teamMember} alt="" />
                </div>
                <div className={styles["full-name"]}>Phạm Quốc Bảo</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["about__team--cpright"]}>
          <h3>Capstone project 1 - Trường Đạo tạo Quốc Tế - Đại học Duy Tân</h3>
        </div>
      </div>
      <Bot  isShowIcon={false}/>
    </>
  );
}
