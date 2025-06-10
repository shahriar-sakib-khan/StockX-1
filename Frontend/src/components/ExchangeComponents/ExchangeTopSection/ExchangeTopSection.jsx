import { NavLink } from "react-router-dom";
import styles from "./ExchangeTopSection.module.css";
import { useExchangeStore } from "../../../stores/exchangeStore";

export default function ExchangeTopSection() {
  const deliveredItems = useExchangeStore((state) => state.deliveredItems);
  const receivedItems = useExchangeStore((state) => state.receivedItems);
  const clearAllExchangeData = useExchangeStore(
    (state) => state.clearAllExchangeData
  );

  const onPrint = () => {
    console.log(deliveredItems);
    console.log(receivedItems);
  };

  return (
    <div className={styles.exchangeTopSection}>
      <div className={styles.navButtons}>
        <NavLink to={-1} className={styles.btn}>
          Select Shop
        </NavLink>
        <button onClick={() => clearAllExchangeData()} className={styles.btn}>
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
      </div>
    </div>
  );
}
