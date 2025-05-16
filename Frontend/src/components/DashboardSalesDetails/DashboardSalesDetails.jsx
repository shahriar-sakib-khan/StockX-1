import styles from "./DashboardSalesDetails.module.css";
import { ShopDetails, CashBoxDetails } from "../";

export default function DashboardSalesDetails({
  name = false,
  owner = false,
  address = false,
  center = false,
}) {
  return (
    <div className={styles.dashboardSalesDetails}>
      <div className={styles.dashboardSalesDetailsTop}>
        <ShopDetails
          name={name}
          owner={owner}
          address={address}
          center={center}
        />
      </div>
      <div className={styles.dashboardSalesDetailsBottom}>
        <CashBoxDetails center />
        <CashBoxDetails className={styles.middle} center />
        <CashBoxDetails center />
      </div>
    </div>
  );
}
