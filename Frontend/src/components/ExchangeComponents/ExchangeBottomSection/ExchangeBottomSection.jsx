import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import styles from "./ExchangeBottomSection.module.css";

export default function ExchangeBottomSection(props) {
  const { activeSection } = props.context;

  // handlers here for adding regulators and stoves may be added here later

  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div className={styles.regulator}>
          {/* Add regulator controls here, e.g. a button or form */}
          Add regulator
        </div>
        <div className={styles.stove}>
          {/* Add stove controls here, e.g. a button or form */}
          Add stove
        </div>
      </div>
      <ExchangeSlider activeSection={activeSection} />
    </div>
  );
}
