import styles from './bot.module.css';
import bot from '../../../../assets/bot.png';
import vector from '../../../../assets/vector.png';
export default function Bot() {
  return (
    <div className={styles.bot}>
      <img className="icon" src={bot} alt="" />
      <img className={styles.vector} src={vector} alt="" />
    </div>
  );
}
