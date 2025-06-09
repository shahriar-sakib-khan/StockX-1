import { NavLink } from "react-router-dom";
import styles from "./Initialization.module.css";

export default function Initialization() {
  return (
    <div className={styles.initialization}>
      Initialization page <NavLink to="/dashboard/inventory">Done</NavLink>
    </div>
  );
}
