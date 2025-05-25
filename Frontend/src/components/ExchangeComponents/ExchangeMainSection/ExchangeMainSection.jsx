import { useState } from "react";
import ExchangeList from "../ExchangeList/ExchangeList";
import styles from "./ExchangeMainSection.module.css";

export default function ExchangeMainSection() {
  const [activeSection, setActiveSection] = useState("delivered"); // delivered | received

  const onClick = (active) => {
    setActiveSection(active);
  };

  return (
    <div className={styles.exchangeSection}>
      <ExchangeList
        type="delivered"
        active={activeSection === "delivered"}
        onClick={() => onClick("delivered")}
      />
      <ExchangeList
        type="received"
        active={activeSection === "received"}
        onClick={() => onClick("received")}
      />
    </div>
  );
}
