import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";

export default function ExchangeSlider() {
  const cards = Array.from({ length: 10 }, (_, i) => (
    <ExchangeSliderCard key={i} />
  ));
  return <div className={styles.exchangeSlider}>{cards}</div>;
}
