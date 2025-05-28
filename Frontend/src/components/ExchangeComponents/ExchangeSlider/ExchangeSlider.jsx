import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";

export default function ExchangeSlider({
  activeSection = "",
  // selectedBrands = [],
}) {
  const cards = Array.from({ length: 10 }, (_, i) => (
    <ExchangeSliderCard
      key={i}
      stock={100}
      name="Random Name"
      price="1500"
      activeSection={activeSection}
    />
  ));
  return <div className={styles.exchangeSlider}>{cards}</div>;
}
