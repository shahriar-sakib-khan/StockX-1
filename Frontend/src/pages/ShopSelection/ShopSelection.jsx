import { NavLink } from "react-router-dom";
import styles from "./ShopSelection.module.css";

export default function ShopSelection() {
  return (
    <div className={styles.shopSelection}>
      <h1>Shop Selection page</h1>
      <NavLink to="./exchange">Exchange</NavLink>
    </div>
  );
}
