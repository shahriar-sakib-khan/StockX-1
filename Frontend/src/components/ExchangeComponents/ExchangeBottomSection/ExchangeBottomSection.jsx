import { useState } from "react";
import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import AccessoryModal from "../AccessoryModal/AccessoryModal";
import styles from "./ExchangeBottomSection.module.css";
import { useAccessoryStore } from "../../../stores/AccessoryStore";

export default function ExchangeBottomSection({ context }) {
  const { activeSection } = context;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // stove | regulator

  const regulator = useAccessoryStore((state) => state.regulator);
  const stove = useAccessoryStore((state) => state.stove);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  const isReceived = activeSection === "received";
  const initialValues = modalType === "stove" ? stove : regulator;

  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div
          className={styles.regulator}
          role="button"
          tabIndex={0}
          onClick={() => !isReceived && openModal("regulator")}
          aria-disabled={isReceived}
        >
          Add regulator
        </div>
        <div
          className={styles.stove}
          role="button"
          tabIndex={0}
          onClick={() => !isReceived && openModal("stove")}
          aria-disabled={isReceived}
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
          initialValues={initialValues}
        />
      )}
    </div>
  );
}
