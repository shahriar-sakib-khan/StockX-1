import {
  ExchangeTopSection,
  ExchangeBottomSection,
  ExchangeMainSection,
} from "../../components";
import styles from "./Exchange.module.css";

export default function Exchange() {
  return (
    <div className="wrapper">
      <div className={styles.exchange}>
        <ExchangeTopSection />
        <ExchangeMainSection />
        <ExchangeBottomSection />
      </div>
    </div>
  );
}
