import styles from "./CashBoxDetails.module.css";

export default function CashBoxDetails({ center = false, className = "" }) {
  // details to be fetched from api
  const cash = 15000;
  return (
    <div
      className={[
        styles.cashBoxDetails,
        className,
        center ? styles.center : "",
      ].join(" ")}
    >
      <span className={styles.title}>Takar baksho</span>
      {/* <h1 className={styles.title}>Cash Box</h1> */}
      <span className={styles.cashAmount}>{cash} Taka</span>
    </div>
  );
}
