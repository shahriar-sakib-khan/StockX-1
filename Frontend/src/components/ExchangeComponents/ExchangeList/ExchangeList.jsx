import ExchangeListItem from "../ExchangeListItem/ExchangeListItem";
import styles from "./ExchangeList.module.css";
import { useOutletContext } from "react-router-dom";

export default function ExchangeList({
  type = "delivered" | "received",
  active = false,
  onClick,
  className = "",
}) {
  const { deliveredItems, receivedItems } = useOutletContext();

  const title =
    type === "delivered"
      ? "Delivered"
      : type === "received"
      ? "Received"
      : "Title";

  const itemsList =
    type === "delivered"
      ? Array.isArray(deliveredItems)
        ? deliveredItems
        : []
      : type === "received"
      ? Array.isArray(receivedItems)
        ? receivedItems
        : []
      : [];

  const items = itemsList.map((item, i) => (
    <ExchangeListItem key={i} item={item} />
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
