import ExchangeListItem from "../ExchangeListItem/ExchangeListItem";
import styles from "./ExchangeList.module.css";

export default function ExchangeList({
  type = "delivered" | "received",
  active = false,
  onClick,
  className = "",
}) {
  const title =
    type === "delivered"
      ? "Delivered"
      : type === "received"
      ? "Received"
      : "Title";

  const items = Array.from({ length: 10 }, (_, i) => (
    <ExchangeListItem key={i} />
  ));

  return (
    <div
      className={[
        styles.exchangeListContainer,
        active ? styles.active : "",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      <div className={styles.heading}>{title}</div>
      <div className={styles.list}>{items}</div>
    </div>
  );
}
