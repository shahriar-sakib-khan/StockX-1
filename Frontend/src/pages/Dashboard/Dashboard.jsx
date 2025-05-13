// import { ThemeSwitch } from "../../components";
import styles from "./Dashboard.module.css";
import { ThemeSwitch } from "../../components";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.main}>This is the dashboard component</h1>
      <ThemeSwitch />
    </div>
  );
}
