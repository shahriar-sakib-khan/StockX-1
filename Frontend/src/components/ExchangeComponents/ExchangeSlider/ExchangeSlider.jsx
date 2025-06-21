import { useState } from "react";
import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";
import CylinderModal from "../CylinderModal/CylinderModal";
import { useBrandStore } from "../../../stores/brandStore";

export default function ExchangeSlider({ activeSection }) {
  const draftSelectedBrands = useBrandStore(
    (state) => state.draftSelectedBrands
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // card object

  const cardsData = draftSelectedBrands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    stock: brand.totalCylinderCount,
    price: brand.price,
    image: brand.image,
    key: `${brand.id}`,
  }));

  const cards = cardsData.map((card) => (
    <ExchangeSliderCard
      key={card.key}
      name={card.name}
      stock={card.stock}
      price={card.price}
      image={card.image}
      activeSection={activeSection}
      onAdd={() => {
        setSelectedCard(card);
        setModalOpen(true);
      }}
    />
  ));

  return (
    <div className={styles.exchangeSlider}>
      {cards.length > 0 ? cards : <p>No brands selected</p>}
      <CylinderModal
        open={modalOpen}
        card={selectedCard}
        activeSection={activeSection}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
