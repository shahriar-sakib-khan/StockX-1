import { NavLink } from "react-router-dom";
import styles from "./ExchangeTopSection.module.css";

export default function ExchangeTopSection() {
  return (
    <div className={styles.exchangeTopSection}>
      <div className={styles.navButtons}>
        <NavLink to={-1} className={styles.btn}>
          Select Shop
        </NavLink>
        <NavLink to="./receipt" className={styles.btn}>
          Receipt
        </NavLink>
      </div>
      <div className={styles.shopInfo}>
        <span className={styles.shopName}>Shop Info</span>
      </div>
    </div>
  );
}
