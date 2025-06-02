// import { useOutletContext } from "react-router-dom";
import styles from "./ReceiptTable.module.css";

export default function ReceiptTable({ type = "" }) {
  // const { deliveredItems, receivedItems } = useOutletContext();

  // const list = type === "delivered" ? deliveredItems : receivedItems;

  return (
    <div className={styles.receiptTable}>
      <table className={styles.tableContainer} role="table">
        <caption className={styles.caption} role="caption">
          {type === "delivered" ? "Delivered" : "Received"} Items
        </caption>
        <thead role="rowgroup">{type}</thead>
        {/* <thead role="rowgroup">{renderTableHeader(false)}</thead> */}
        <tbody className={styles.tableBody} role="rowgroup">
          {/* <tr>
            <td>1</td>
            <td>Company</td>
            <td>400</td>
            <td>5</td>
            <td>2000</td>
            <td>O</td>
          </tr> */}
          {/* {renderTableRows(deliveredItems, false)} */}
          {/* {renderTableRowsDelivered()} */}
          {/* {renderTableRowsReceived()} */}
        </tbody>
      </table>
    </div>
  );
}
