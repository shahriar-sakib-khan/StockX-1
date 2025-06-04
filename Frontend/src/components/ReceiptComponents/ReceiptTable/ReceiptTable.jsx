import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./ReceiptTable.module.css";

const GROUPS = [
  { type: "cylinder", label: "Cylinders" },
  { type: "regulator", label: "Regulators" },
  { type: "stove", label: "Stoves" },
];

export default function ReceiptTable({ type = "" }) {
  const { deliveredItems = [], receivedItems = [] } = useOutletContext();
  const [paid, setPaid] = useState("");
  const [isGrandTotalEditable, setIsGrandTotalEditable] = useState(false);
  const [customGrandTotal, setCustomGrandTotal] = useState(null);
  const grandTotalInputRef = useRef(null);

  const list = type === "delivered" ? deliveredItems : receivedItems;
  const calculatedGrandTotal = list.reduce(
    (sum, item) => sum + Number(item.count) * Number(item.price || 0),
    0
  );
  const grandTotal =
    customGrandTotal !== null ? Number(customGrandTotal) : calculatedGrandTotal;
  const paidAmount = Number(paid) || 0;
  const due = Math.max(grandTotal - paidAmount, 0);

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
                className={styles.noItems}
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
                  <td colSpan={type === "delivered" ? 6 : 5}>{group.label}</td>
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
                <div className={styles.formGroup} style={{ margin: 0 }}>
                  <input
                    type="number"
                    id="grandTotal"
                    className={styles.priceInput}
                    min="0"
                    value={
                      customGrandTotal !== null
                        ? customGrandTotal
                        : calculatedGrandTotal
                    }
                    ref={grandTotalInputRef}
                    readOnly={!isGrandTotalEditable}
                    onBlur={() => setIsGrandTotalEditable(false)}
                    onChange={(e) => setCustomGrandTotal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                  />
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setIsGrandTotalEditable(true);
                      setTimeout(() => grandTotalInputRef.current?.focus(), 0);
                    }}
                    style={{
                      marginLeft: 6,
                      verticalAlign: "middle",
                      cursor: "pointer",
                    }}
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="5" className={styles.paidLabel}>
                Paid
              </td>
              <td>
                <input
                  className={styles.paidInput}
                  type="number"
                  min="0"
                  value={paid}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (Number(value) > grandTotal) {
                      value = grandTotal;
                    }
                    setPaid(value);
                  }}
                  placeholder="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.target.blur();
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="5" className={styles.dueLabel}>
                Due
              </td>
              <td className={styles.dueValue}>{due}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
