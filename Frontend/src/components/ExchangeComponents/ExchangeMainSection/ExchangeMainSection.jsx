import { useState } from "react";
import ExchangeList from "../ExchangeList/ExchangeList";
import styles from "./ExchangeMainSection.module.css";

export default function ExchangeMainSection() {
  const [activeSection, setActiveSection] = useState("delivered"); // delivered | received

  const onClick = (active) => {
    setActiveSection(active);
  };

  return (
    <div className={styles.exchangeMainSection}>
      <div className={styles.exchangeSection}>
        <ExchangeList
          type="delivered"
          active={activeSection === "delivered"}
          onClick={() => onClick("delivered")}
          className={[
            styles.delivered,
            activeSection === "delivered" ? "" : styles.hidden,
          ].join(" ")}
        />
        <ExchangeList
          type="received"
          active={activeSection === "received"}
          onClick={() => onClick("received")}
          className={[
            styles.received,
            activeSection === "received" ? "" : styles.hidden,
          ].join(" ")}
        />
      </div>
      <div className={styles.btnSection}>
        <button
          onClick={() =>
            onClick(activeSection === "delivered" ? "received" : "delivered")
          }
          className={[styles[activeSection], styles.hidden].join(" ")}
        >
          {activeSection === "delivered"
            ? "Go to Received ->"
            : "<- Go to Delivered"}
        </button>
        {/* <button
          onClick={() => onClick("received")}
          className={styles[activeSection]}
        >
          Go to Received -{">"}
        </button> */}
      </div>
    </div>
  );
}
