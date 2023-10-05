import bot from '../../../../assets/bot.png';
import vector from '../../../../assets/vector.png';
import styles from './home-page.module.css';
export default function HomePage() {
  return (
    <section className={styles.home__container}>
      <div className={styles.bot}>
        <img src={bot} alt={bot}/>
      </div>
      <div className={styles.vector}>
        <img src={vector} alt={vector} />
      </div>
      <div className={styles.title}>
        <div>Xin chào! Tôi có thể giúp <br></br> gì cho bạn?</div>
        <button>Bắt đầu!</button>
      </div>
    </section>
  );
}
