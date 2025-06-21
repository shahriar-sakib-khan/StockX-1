import { NavLink } from "react-router-dom";
import styles from "./ExchangeTopSection.module.css";
import { useExchangeStore } from "../../../stores/exchangeStore";
import { useAccessoryStore } from "../../../stores/AccessoryStore";
import { useBrandStore } from "../../../stores/brandStore";

export default function ExchangeTopSection() {
  // exchange store imports
  const deliveredItems = useExchangeStore((state) => state.deliveredItems);
  const receivedItems = useExchangeStore((state) => state.receivedItems);
  const clearAllExchangeData = useExchangeStore(
    (state) => state.clearAllExchangeData
  );

  // cylinder store imports
  const clearBrandChanges = useBrandStore((state) => state.clearBrandChanges);

  // accessory store imports
  const clearAccessoriesChanges = useAccessoryStore(
    (state) => state.clearAccessoriesChanges
  );
  const submitAccessoryChanges = useAccessoryStore(
    (state) => state.submitAccessoryChanges
  );
  const setRegulatorStock = useAccessoryStore(
    (state) => state.setRegulatorStock
  );
  const setStoveStock = useAccessoryStore((state) => state.setStoveStock);

  const clearLists = () => {
    clearAllExchangeData();
    clearBrandChanges();
    clearAccessoriesChanges();
  };

  const onPrint = () => {
    console.log(deliveredItems);
    console.log(receivedItems);
  };

  const onAddAccessories = () => {
    setRegulatorStock(10);
    setStoveStock(10);
    submitAccessoryChanges();
  };

  return (
    <div className={styles.exchangeTopSection}>
      <div className={styles.navButtons}>
        <NavLink to={-1} className={styles.btn}>
          Select Shop
        </NavLink>
        <button onClick={clearLists} className={styles.btn}>
          Clear list
        </button>
        <button onClick={onPrint} className={styles.btn}>
          Print list
        </button>
        <NavLink to="./receipt" className={styles.btn}>
          Receipt
        </NavLink>
      </div>
      <div className={styles.shopInfo}>
        <span className={styles.shopName}>Shop Info</span>
        <button onClick={onAddAccessories} className={styles.hidden}>
          Add accessories
        </button>
      </div>
    </div>
  );
}
