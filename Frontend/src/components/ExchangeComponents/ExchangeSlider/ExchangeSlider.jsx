import { useState } from "react";
import ExchangeSliderCard from "../ExchangeSliderCard/ExchangeSliderCard";
import styles from "./ExchangeSlider.module.css";
import ExchangeModal from "../ExchangeModal/ExchangeModal";
import { useBrandStore } from "../../../stores/brandStore";

export default function ExchangeSlider({ activeSection = "" }) {
  const brands = useBrandStore((state) => state.selectedBrands);
  const setBrands = useBrandStore((state) => state.setBrands);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsData = brands.map((brand) => ({
    brandId: brand.id,
    brandName: brand.name,
    stock: brand.totalCylinderCount,
    price: brand.price,
    imgSrc: brand.image,
    key: `${brand.id}`,
  }));

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
      {cards}
      <ExchangeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        card={selectedCard}
        setCylinders={setBrands} // or rename to setBrands in modal too
        activeSection={activeSection}
      />
    </div>
  );
}
