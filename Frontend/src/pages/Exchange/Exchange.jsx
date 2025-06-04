import { useState } from "react";
import {
  ExchangeTopSection,
  ExchangeBottomSection,
  ExchangeMainSection,
} from "../../components";
import styles from "./Exchange.module.css";

export default function Exchange() {
  const [activeSection, setActiveSection] = useState("delivered"); // delivered | received

  return (
    <div className="wrapper">
      <div className={styles.exchange}>
        <ExchangeTopSection />
        <ExchangeMainSection
          context={{
            activeSection,
            setActiveSection,
          }}
        />
        <ExchangeBottomSection
          context={{
            activeSection,
          }}
        />
      </div>
    </div>
  );
}
