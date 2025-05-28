import { useState } from "react";
import allBrands from "../../assets/Lists/list_of_brands";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import {
  ExchangeTopSection,
  ExchangeBottomSection,
  ExchangeMainSection,
} from "../../components";
import styles from "./Exchange.module.css";

export default function Exchange() {
  const [activeSection, setActiveSection] = useState("delivered"); // delivered | received
  const [selectedBrands] = useState(allBrands);

  const [deliveredItems, setDeliveredItems] = useLocalStorageState(
    "deliveredItems",
    {}
  );
  const [receivedItems, setReceivedItems] = useLocalStorageState(
    "receivedItems",
    {}
  );

  return (
    <div className="wrapper">
      <div className={styles.exchange}>
        <ExchangeTopSection />
        <ExchangeMainSection
          context={{
            activeSection,
            setActiveSection,
            deliveredItems,
            receivedItems,
          }}
        />
        <ExchangeBottomSection
          context={{
            activeSection,
            selectedBrands,
            deliveredItems,
            setDeliveredItems,
            receivedItems,
            setReceivedItems,
          }}
        />
      </div>
    </div>
  );
}
