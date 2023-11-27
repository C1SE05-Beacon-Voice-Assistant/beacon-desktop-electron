import bot from "~/assets/bot.png";
import styles from "./Conversation.module.css";
import Bot from "~/components/bot";
import { useEffect, useState } from "react";
import moment from "moment";
export default function Conversation() {
  const [conversations, setConversation] = useState([]);
  useEffect(() => {
    // Handle save log to tmp, main log file and display all log to conversation pages
    handleStoreAndGetConversation();
    // Setup 10s to clear and send request to save logs on server;
    window.electron.clearConversations()
  }, []);
  const getAllConversation = async () => {
    fetch("/beacon_package/log/main.log")
      .then(async (response) => response.text())
      .then((data: any) => {
        const conversations = data.split("\n"); // Split content into lines
        // Append each line to the conversation array
        let array: any = [];
        conversations.forEach((line: any) => {
          if (line) {
            array.push(line);
          }
        });
        setConversation(array);
      });
  };
  const handleStoreAndGetConversation = async () => {
    await window.electron.storeConversation();
    await getAllConversation();
  };

  const mergedArray = conversations.reduce((accumulator, currentValue) => {
    const date = JSON.parse(currentValue).date.split("T")[0]; // Lấy phần ngày từ chuỗi ngày-giờ
    if (!accumulator[date]) {
      accumulator[date] = [];
    }
    accumulator[date].push(currentValue);
    return accumulator;
  }, {});

  return (
    <div className={styles.container}>
      <div className="body">
        <h1 className={styles.title}>
          <span>Lịch sử trò chuyện</span>
        </h1>

        <div className={styles["content-wrapper"]}>
          {conversations.length > 0 ? (
            Object.keys(mergedArray).map((key: string, index) => {
              const conversationFormatByDate = mergedArray[key];
              return conversationFormatByDate.map(
                (conversation: any, index: number) => {
                  const data = JSON.parse(conversation);
                  const currentDate = moment().startOf("day");
                  const date = moment(key);
                  const diffDays = currentDate.diff(date, "days");
                  let formattedTime = "";
                  if (diffDays === 0) {
                    formattedTime = "Hôm nay";
                  } else if (diffDays === 1) {
                    formattedTime = "Hôm qua";
                  } else {
                    formattedTime = `${Math.abs(diffDays)} ngày trước`;
                  }
                  return (
                    <div key={index} className={styles.content}>
                      <h3 className={styles.time}>
                        {index === 0 && formattedTime}
                      </h3>
                      <div className={styles.conversion}>
                        <div className={styles.img}>
                          <img src={bot} alt="" />
                        </div>
                        <div className={styles.message}>{data.query}</div>
                      </div>
                    </div>
                  );
                }
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
