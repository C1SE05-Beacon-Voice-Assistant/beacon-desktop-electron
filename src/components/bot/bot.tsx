import styled from "styled-components";
import styles from "./bot.module.css";
import BotImage from "~/assets/bot.png";
import Vector from "~/assets/vector.svg";
interface BotProps {
  marginLeft?: boolean;
  isShowIcon?: boolean;
}
export default function Bot(props: BotProps) {
  const { marginLeft, isShowIcon = true } = props;
  return (
    <div className={styles.bot__container}>
      {isShowIcon && (
        <BotIcon $marginLeft={marginLeft}>
          <img className={styles.bot} src={BotImage} alt="" />
        </BotIcon>
      )}

      <img className={styles.vector} src={Vector} alt="" />
    </div>
  );
}
interface BotIconProps {
  $marginLeft?: boolean;
}
const BotIcon = styled.div<BotIconProps>`
  position: absolute;
  transform: scale(0.6);
  margin-left: ${({ $marginLeft }) => ($marginLeft ? 260 : 180)}px;
`;
