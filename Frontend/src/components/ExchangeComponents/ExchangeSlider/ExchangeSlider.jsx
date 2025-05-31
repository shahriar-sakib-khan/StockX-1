import { useState } from "react";
import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";
import ExchangeModal from "../ExchangeModal/ExchangeModal";

export default function ExchangeSlider({
  activeSection = "",
  // selectedBrands = [],
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const cardsData = Array.from({ length: 10 }, (_, i) => ({
    key: i,
    stock: 100,
    name: "Random Brand",
    price: "1500",
  }));

  const cards = cardsData.map((card) => (
    <ExchangeSliderCard
      key={card.key}
      stock={card.stock}
      name={card.name}
      price={card.price}
      activeSection={activeSection}
      onAdd={() => {
        setSelectedCard(card);
        setModalOpen(true);
      }}
    />
  ));
  return (
    <div className={styles.exchangeSlider}>
      {cards}
      <ExchangeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        card={selectedCard}
      />
    </div>
  );
}
