import { useEffect, useState } from "react";
import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";
import ExchangeModal from "../ExchangeModal/ExchangeModal";
import { useBrandStore } from "../../../stores/brandStore";

export default function ExchangeSlider({ activeSection = "" }) {
  const draftBrands = useBrandStore((state) => state.draftSelectedBrands);
  const initializeDraft = useBrandStore((state) => state.initializeDraft);

  const brandsToShow = draftBrands;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = brandsToShow.map((brand) => ({
    brandId: brand.id,
    brandName: brand.name,
    stock: brand.totalCylinderCount,
    price: brand.price,
    imgSrc: brand.image,
    key: `${brand.id}`,
  }));

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  const cards = cardsData.map((card) => (
    <ExchangeSliderCard
      key={card.key}
      stock={card.stock}
      name={card.brandName}
      price={card.price}
      imgSrc={card.imgSrc}
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
      <ExchangeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        card={selectedCard}
        setCylinders={() => {}} // placeholder or remove if not needed here
        activeSection={activeSection}
      />
    </div>
  );
}
