import styles from "./Conversation.module.css";
import Bot from "~/components/bot";
import { useEffect, useState } from "react";
import { getAllConversation } from "~/services/conversation";
import { diffDate } from "~/lib/date";

export default function Conversation() {
  const [conversations, setConversation] = useState([]);
  useEffect(() => {
    getAllConversation()
      .then((res) => res.text())
      .then((data) => {
        const conversations = data.split("\n"); // Split content into lines
        // Append each line to the conversation array
        const arrTmp: Array<object> = [];
        conversations.forEach((line: any) => {
          if (line) {
            arrTmp.push(line);
          }
        });
        setConversation(arrTmp);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className="body">
        <h1 className={styles.title}>
          <span>Lịch sử trò chuyện</span>
        </h1>

        <div className={styles["content-wrapper"]}>
          {conversations.length > 0 ? (
            conversations.reverse().map((item, index) => {
              const data = JSON.parse(item);
              return (
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
                    <div className={styles.message}>{data.query}</div>
                  </div>
                  <p className={styles.time}>{diffDate(data.date)}</p>
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
