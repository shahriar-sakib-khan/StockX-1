import { NavLink } from "react-router-dom";
import styles from "./Selection.module.css";

export default function Selection() {
  return (
    <div className={styles.selection}>
      <h1>Selection page</h1>
      <NavLink to="./initialization">Initialization</NavLink>
    </div>
  );
}
