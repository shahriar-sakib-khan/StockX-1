// import { FaDownload, FaPrint } from "react-icons/fa";
import {
  ReceiptHeader,
  ReceiptMainSection,
  ReceiptTopSection,
} from "../../components";
import styles from "./Receipt.module.css";

export default function Receipt() {
  // const onPrint = () => {
  //   window.print();
  // };

  return (
    <div className="wrapper">
      <div className={styles.printArea}>
        <ReceiptTopSection className={styles.dontPrint} />
        <ReceiptHeader />
        <ReceiptMainSection />
        {/* <div className={[styles.receiptButtons, styles.dontPrint].join(" ")}>
          <button type="button" onClick={onPrint} className={styles.receiptBtn}>
            <FaPrint /> <span>Print</span>
          </button>
          <button type="button" className={styles.receiptBtn}>
            <FaDownload /> <span>Download</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
