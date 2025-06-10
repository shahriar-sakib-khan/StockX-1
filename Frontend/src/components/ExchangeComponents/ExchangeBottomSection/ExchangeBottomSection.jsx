import { useState } from "react";
import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import AccessoryModal from "../AccessoryModal/AccessoryModal";
import styles from "./ExchangeBottomSection.module.css";

export default function ExchangeBottomSection({ context }) {
  const { activeSection } = context;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "stove" or "regulator"

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const onlyCylinder = activeSection === "received";

  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div
          className={styles.regulator}
          role="button"
          tabIndex={0}
          onClick={() => !onlyCylinder && openModal("regulator")}
          aria-disabled={onlyCylinder}
        >
          Add regulator
        </div>
        <div
          className={styles.stove}
          role="button"
          tabIndex={0}
          onClick={() => !onlyCylinder && openModal("stove")}
          aria-disabled={onlyCylinder}
        >
          Add stove
        </div>
      </div>
      <ExchangeSlider activeSection={activeSection} />
      {modalOpen && (
        <AccessoryModal
          open={modalOpen}
          itemType={modalType}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
