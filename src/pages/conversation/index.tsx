import styles from "./Conversation.module.css";
import Bot from "~/components/bot";
import { memo, useContext} from "react";
import { diffDate } from "~/lib/date";
import { ConversationContext } from "~/App";

 function Conversation() {
  const conversation = useContext(ConversationContext)
  return (
    <div className={styles.container}>
      <div className="body">
        <h1 className={styles.title}>
          <span>Lịch sử trò chuyện</span>
        </h1>

        <div className={styles["content-wrapper"]}>
          {conversation.length > 0 ? (
            conversation.map((item, index) => {
              return (
                item.query &&
                <div key={index} className={styles.content}>
                  <div className={styles.conversion}>
                    <div className={styles.svg}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <div className={styles.message}>{item.query}</div>
                  </div>
                  <p className={styles.time}>{diffDate(item.date)}</p>
                </div>
              );
            })
          ) : (
            <h3 style={{ textAlign: "center" }}>Conversation is empty !</h3>
          )}
        </div>
      </div>
      <div className={styles.bot}>
        <Bot />
      </div>
    </div>
  );
}
export default memo(Conversation)
