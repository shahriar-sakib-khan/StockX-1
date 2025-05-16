// import { ThemeSwitch } from "../../components";
import styles from "./Dashboard.module.css";
import {
  ThemeSwitch,
  DashboardSalesDetails,
  DashboardNavigation,
  DashboardStatistics,
} from "../../components";

export default function Dashboard() {
  return (
    <div className="wrapper">
      <div className={styles.dashboard}>
        <DashboardSalesDetails name owner address />
        <DashboardNavigation />
        <DashboardStatistics />
      </div>
    </div>
  );
}
