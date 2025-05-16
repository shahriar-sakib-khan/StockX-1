import { NavLink } from "react-router-dom";
import styles from "./Exchange.module.css";

export default function Exchange() {
  return (
    <div className={styles.exchange}>
      <h1>Exchange page</h1>
      <NavLink to="./receipt">Receipt</NavLink>
    </div>
  );
}
