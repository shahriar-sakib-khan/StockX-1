import cylinderImage from "../../../assets/cylinder_img/cylinderModel.png";
import styles from "./ExchangeSliderCard.module.css";

export default function ExchangeSliderCard({
  imgSrc = cylinderImage,
  name = "Name",
  price = "0",
}) {
  return (
    <div className={styles.card}>
      <img src={imgSrc} alt="cylinder" />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>Price: {price} Taka</span>
      </div>
    </div>
  );
}
