import ReceiptTable from "../ReceiptTable/ReceiptTable";
import styles from "./ReceiptMainSection.module.css";

export default function ReceiptMainSection() {
  return (
    <div className={styles.receiptMainSection}>
      <ReceiptTable type="delivered" />
      <ReceiptTable type="received" />
    </div>
  );
}
