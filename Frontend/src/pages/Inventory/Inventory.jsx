import { NavLink } from "react-router-dom";
import styles from "./Inventory.module.css";

export default function Inventory() {
  return (
    <div className={styles.inventory}>
      <h1>Inventory page</h1>
      <NavLink to="./empty-cylinders">Empty Cylinders</NavLink>
    </div>
  );
}
