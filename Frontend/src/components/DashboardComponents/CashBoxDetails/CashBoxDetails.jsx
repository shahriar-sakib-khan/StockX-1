import styles from "./CashBoxDetails.module.css";

export default function CashBoxDetails({
  type = "cashbox" | "expenses" | "income",
  center = false,
  className = "",
}) {
  // details to be fetched from api
  const cashBoxAmount = 15000;
  const todaysIncome = 7000;
  const todaysExpenses = 2000;

  const title =
    type === "cashbox"
      ? "Cash Box"
      : type === "expenses"
      ? "Today's Expenses"
      : type === "income"
      ? "Today's Income"
      : "Name";

  const cash =
    type === "cashbox"
      ? cashBoxAmount
      : type === "expenses"
      ? todaysExpenses
      : type === "income"
      ? todaysIncome
      : 0;

  const classColor =
    type === "cashbox"
      ? styles.amount_blue
      : type === "expenses"
      ? styles.amount_red
      : type === "income"
      ? styles.amount_green
      : 0;

  return (
    <div
      className={[
        styles.cashBoxDetails,
        className,
        center ? styles.center : "",
      ].join(" ")}
    >
      <span className={styles.title}>{title}</span>
      {/* <h1 className={styles.title}>Cash Box</h1> */}
      <span className={[styles.cashAmount, classColor].join(" ")}>
        <span className={styles.amount}>{cash}</span> Taka
      </span>
    </div>
  );
}
