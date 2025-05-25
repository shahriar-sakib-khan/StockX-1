import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import styles from "./ExchangeBottomSection.module.css";

export default function ExchangeBottomSection() {
  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div className={styles.regulator}>Add regulator</div>
        <div className={styles.stove}>Add stove</div>
      </div>
      <ExchangeSlider />
    </div>
  );
}
