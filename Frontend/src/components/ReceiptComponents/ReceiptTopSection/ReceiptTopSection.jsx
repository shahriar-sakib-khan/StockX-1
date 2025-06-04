import { NavLink } from "react-router-dom";
import styles from "./ReceiptTopSection.module.css";

const ReceiptTopSection = () => {
  return (
    <div className={styles.receiptTopSection}>
      <NavLink to={-1} className={styles.btn}>
        Go Back
      </NavLink>
      <NavLink to="#" className={styles.btn}>
        Save
      </NavLink>
    </div>
  );
};

export default ReceiptTopSection;
