import NavComponent from "../NavComponent/NavComponent";
import images from "../../assets/nav_icons/Images";
import styles from "./DashboardBuySell.module.css";

export default function DashboardBuySell() {
  return (
    <div className={styles.dashboardBuySell}>
      <NavComponent path="./buy" imgSrc={images.img_buy} title="Buy" />
      <NavComponent
        path="./shop-selection"
        imgSrc={images.img_sell}
        title="Sell"
      />
      <NavComponent path="#" imgSrc={images.img_due} title="Due" />
    </div>
  );
}
