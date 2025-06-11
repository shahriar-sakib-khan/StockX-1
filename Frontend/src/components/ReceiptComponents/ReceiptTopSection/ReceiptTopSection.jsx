import { NavLink } from "react-router-dom";
import styles from "./ReceiptTopSection.module.css";

const ReceiptTopSection = ({ className = "" }) => {
  return (
    <div className={[styles.receiptTopSection, className].join(" ")}>
      <NavLink to={-1} className={styles.btn}>
        Go Back
      </NavLink>
      <NavLink to="#" className={styles.btn}>
        {/* save the exchange data and then clear the exchange lists */}
        Save
      </NavLink>
    </div>
  );
};

export default ReceiptTopSection;
