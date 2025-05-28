import {
  ReceiptHeader,
  ReceiptMainSection,
  ReceiptTopSection,
} from "../../components";
import styles from "./Receipt.module.css";

export default function Receipt() {
  return (
    <div className="wrapper">
      <div className={styles.receipt}>
        <ReceiptTopSection />
        <ReceiptHeader />
        <ReceiptMainSection />
      </div>
    </div>
  );
}
