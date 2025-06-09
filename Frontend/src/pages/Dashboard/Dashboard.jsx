// import { ThemeSwitch } from "../../components";
import styles from "./Dashboard.module.css";
import {
  DashboardSalesDetails,
  DashboardNavigation,
  DashboardStatistics,
  DashboardBuySell,
} from "../../components";

export default function Dashboard() {
  return (
    <div className="wrapper">
      <div className={styles.dashboard}>
        <DashboardSalesDetails name owner address />
        <DashboardBuySell />
        <DashboardNavigation />
        <DashboardStatistics />
      </div>
    </div>
  );
}
