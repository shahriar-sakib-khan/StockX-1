import { NavLink } from "react-router-dom";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <NavLink to={"./"} className={styles.logo}>
      StockX
    </NavLink>
  );
}
