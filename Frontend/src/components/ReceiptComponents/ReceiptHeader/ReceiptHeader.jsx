import { getFormattedDateTime } from "../../../utils";
import styles from "./ReceiptHeader.module.css";

export default function ReceiptHeader() {
  const currentShopName = "SuperMart";
  const currentShopOwner = "Alice Johnson";
  const currentShopContact = "+1 555-1234";
  const currentShopAddress = "123 Main St, Springfield";

  const transactionID = "TXN-987654";
  const targetShopName = "MegaStore";
  const targetShopOwner = "Bob Smith";
  const targetShopContact = "+1 555-5678";
  const targetShopAddress = "456 Elm St, Shelbyville";

  return (
    <div className={styles.receiptHeader}>
      {/* current shop details */}
      <div className={styles.currentShopDetails}>
        <h1 className={styles.currentShopName}>{currentShopName}</h1>
        <h2 className={styles.currentShopOwner}>{currentShopOwner}</h2>
        {/* <p className={styles.currentShopMoto}>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </p> */}
        <p className={styles.currentShopContact}>Phone: {currentShopContact}</p>
        <p className={styles.currentShopAddress}>{currentShopAddress}</p>
      </div>
      {/* target shop details */}
      <div className={styles.targetShopDetails}>
        <div className={styles.targetShopTop}>
          <span>Receipt No: {transactionID}</span>
          <span>Date: {getFormattedDateTime()}</span>
        </div>
        <div className={styles.targetShopMiddle}>
          <span>Name: {targetShopName}</span>
          <span>Owner: {targetShopOwner}</span>
        </div>
        <div className={styles.targetShopBottom}>
          <span>Address: {targetShopAddress}</span>
          <span>Phone: {targetShopContact}</span>
        </div>
      </div>
    </div>
  );
}
