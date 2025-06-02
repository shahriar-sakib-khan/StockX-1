import React from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./ReceiptTable.module.css";

const GROUPS = [
  { type: "cylinder", label: "Cylinders" },
  { type: "regulator", label: "Regulators" },
  { type: "stove", label: "Stoves" },
];

export default function ReceiptTable({ type = "" }) {
  const { deliveredItems = [], receivedItems = [] } = useOutletContext();

  const list = type === "delivered" ? deliveredItems : receivedItems;

  return (
    <div className={styles.receiptTable}>
      <table className={styles.tableContainer} role="table">
        <caption className={styles.caption} role="caption">
          {type === "delivered" ? "Delivered" : "Received"} Items Receipt
        </caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type/Size</th>
            <th>Count</th>
            {type === "delivered" && <th>Price</th>}
            {type === "delivered" && <th>Total</th>}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {list.length === 0 && (
            <tr>
              <td
                colSpan={type === "delivered" ? 6 : 5}
                style={{
                  textAlign: "center",
                  color: "#aaa",
                }}
              >
                No items
              </td>
            </tr>
          )}
          {GROUPS.map((group) => {
            const groupItems = list
              .map((item, idx) => ({ ...item, idx }))
              .filter((item) => item.productType === group.type);

            if (groupItems.length === 0) return null;

            return (
              <React.Fragment key={group.type}>
                <tr className={styles.groupHeading}>
                  <td
                    colSpan={type === "delivered" ? 6 : 5}
                    style={{
                      fontWeight: 600,
                      background: "none",
                      color: "#333",
                      textAlign: "left",
                    }}
                  >
                    {group.label}
                  </td>
                </tr>
                {groupItems.map((item, idx) => (
                  <tr className={styles.groupItem} key={idx}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      {item.productType === "cylinder"
                        ? `[${item.size}-${item.type}]`
                        : "-"}
                    </td>
                    <td>{item.count}</td>
                    {type === "delivered" && <td>{item.price}</td>}
                    {type === "delivered" && (
                      <td>{Number(item.count) * Number(item.price || 0)}</td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
        {type === "delivered" && list.length > 0 && (
          <tfoot>
            <tr>
              <td colSpan="5" className={styles.grandTotalLabel}>
                Grand Total
              </td>
              <td className={styles.grandTotalValue}>
                {list.reduce(
                  (sum, item) =>
                    sum + Number(item.count) * Number(item.price || 0),
                  0
                )}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
