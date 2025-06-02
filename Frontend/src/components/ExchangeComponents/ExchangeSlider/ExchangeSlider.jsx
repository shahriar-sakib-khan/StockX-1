import { useState } from "react";
import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";
import ExchangeModal from "../ExchangeModal/ExchangeModal";
import { useCylindersStore } from "../../../stores";

export default function ExchangeSlider({ activeSection = "" }) {
  const cylinders = useCylindersStore((state) => state.cylinders);
  const setCylinders = useCylindersStore((state) => state.setCylinders);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Show only one card per brand (ignore sizes/types)
  const cardsData = cylinders.map((brand) => ({
    brandId: brand.id,
    brandName: brand.name,
    stock: brand.totalCylinderCount,
    price: brand.cylinders[0]?.price ?? 0, // Use first cylinder's price or 0
    key: `${brand.id}`,
  }));

  const cards = cardsData.map((card) => (
    <ExchangeSliderCard
      key={card.key}
      stock={card.stock}
      name={card.brandName}
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
        setCylinders={setCylinders}
        activeSection={activeSection}
      />
    </div>
  );
}
