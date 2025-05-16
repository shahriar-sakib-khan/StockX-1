import styles from "./ShopDetails.module.css";

export default function ShopDetails({
  name = false,
  owner = false,
  address = false,
  className = "",
  center = false,
}) {
  // these details are to be fetched from api
  const ShopName = "Mamar dokan";
  const ShopOwner = "Mama";
  const ShopAddress = "Mama barir rasta";

  return (
    <div
      className={[
        styles.shopDetails,
        className,
        center ? styles.center : "",
      ].join(" ")}
    >
      {name && <h1 className={styles.shopName}>{ShopName}</h1>}
      {owner && <h2 className={styles.shopOwner}>{ShopOwner}</h2>}
      {address && <h3 className={styles.shopAddress}>{ShopAddress}</h3>}
    </div>
  );
}
