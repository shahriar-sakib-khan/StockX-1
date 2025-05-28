import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import styles from "./ExchangeBottomSection.module.css";

export default function ExchangeBottomSection(props) {
  const { activeSection, selectedBrands } = props.context;

  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div className={styles.regulator}>Add regulator</div>
        <div className={styles.stove}>Add stove</div>
      </div>
      <ExchangeSlider
        activeSection={activeSection}
        selectedBrands={selectedBrands}
      />
    </div>
  );
}
