import ExchangeList from "../ExchangeList/ExchangeList";
import styles from "./ExchangeMainSection.module.css";

export default function ExchangeMainSection(props) {
  const { activeSection, setActiveSection } = props.context;

  const setActive = (active) => setActiveSection(active);

  return (
    <div className={styles.exchangeMainSection}>
      <div className={styles.exchangeSection}>
        <ExchangeList
          section="delivered"
          active={activeSection === "delivered"}
          onClick={() => setActive("delivered")}
          className={[
            styles.delivered,
            activeSection === "delivered" ? "" : styles.hidden,
          ].join(" ")}
        />
        <ExchangeList
          section="received"
          active={activeSection === "received"}
          onClick={() => setActive("received")}
          className={[
            styles.received,
            activeSection === "received" ? "" : styles.hidden,
          ].join(" ")}
        />
      </div>
      <div className={styles.btnSection}>
        <button
          onClick={() =>
            setActive(activeSection === "delivered" ? "received" : "delivered")
          }
          className={[styles[activeSection], styles.hidden].join(" ")}
        >
          {activeSection === "delivered"
            ? "Go to Received ->"
            : "<- Go to Delivered"}
        </button>
      </div>
    </div>
  );
}
