import NavComponent from "../NavComponent/NavComponent";
import images from "../../../assets/nav_icons/Images";
import styles from "./DashboardNavigation.module.css";

export default function DashboardNavigation() {
  return (
    <div className={styles.dashboardNavigation}>
      {/* <NavComponent
        path="./selection"
        imgSrc={images.img_selection}
        title="Selection"
      /> */}
      <NavComponent
        path="./inventory"
        imgSrc={images.img_inventory}
        title="Inventory"
      />
      <NavComponent path="./shop" imgSrc={images.img_shop} title="Shop" />
      <NavComponent
        path="./vehicles"
        imgSrc={images.img_vehicles}
        title="Vehicles"
      />
      <NavComponent
        path="./exchange-history"
        imgSrc={images.img_history}
        title="History"
      />
      <NavComponent
        path="./daily-sales"
        imgSrc={images.img_dailySales}
        title="Daily Sales"
      />
      <NavComponent
        path="./profile"
        imgSrc={images.img_profile}
        title="Profile"
      />
      <NavComponent
        path="./community"
        imgSrc={images.img_community}
        title="Community"
      />
      <NavComponent path="/" imgSrc={images.img_logout} title="Log out" />
    </div>
  );
}
