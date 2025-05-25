import { NavLink } from "react-router-dom";
import styles from "./ExchangeTopSection.module.css";

export default function ExchangeTopSection() {
  return (
    <div className={styles.exchangeTopSection}>
      <NavLink to={-1} className={styles.btn}>
        Select Shop
      </NavLink>
      <NavLink to="./receipt" className={styles.btn}>
        Next
      </NavLink>
    </div>
  );
}
