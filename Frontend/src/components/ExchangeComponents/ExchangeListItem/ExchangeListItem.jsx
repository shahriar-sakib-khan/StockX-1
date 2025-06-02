import styles from "./ExchangeListItem.module.css";

export default function ExchangeListItem({ item, type }) {
  if (!item) return null;

  return (
    <div className={styles.listItem}>
      <div>
        <strong>{item.name}</strong>
        <span>
          {"  "}[ {item.size}-{item.type} ]
        </span>
      </div>
      <div>
        Count: <strong>{item.count}</strong>
        {type === "delivered" && (
          <>
            Price: <strong>{item.price} ৳ </strong>
          </>
        )}
      </div>
    </div>
  );
}
