import cylinderImage from "../../../assets/cylinder_img/cylinderModel.png";
import styles from "./ExchangeSliderCard.module.css";

export default function ExchangeSliderCard({
  name = "Name",
  stock = null,
  price = "0",
  image = cylinderImage,
  activeSection,
  onAdd,
}) {
  const isOutOfStock = stock === 0 || stock === null;
  const isButtonDisabled =
    !activeSection || (activeSection === "delivered" && isOutOfStock);

  return (
    <div className={styles.card}>
      {typeof stock === "number" && (
        <div className={styles.stockCount}>Stock: {stock}</div>
      )}
      <button
        onClick={onAdd}
        disabled={isButtonDisabled}
        data-tool-tip={
          !activeSection
            ? "Select a section first"
            : stock === 0
            ? "Out of stock"
            : stock === null
            ? "Not in stock"
            : ""
        }
        className={styles.plusBtn}
      >
        +
      </button>
      <img src={image} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>Price: {price} Taka</p>
    </div>
  );
}
