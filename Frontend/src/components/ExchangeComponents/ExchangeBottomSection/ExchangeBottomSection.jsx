import { useState } from "react";
import ExchangeSlider from "../ExchangeSlider/ExchangeSlider";
import AddAccessoryModal from "../AddAccessoryModal/AddAccessoryModal";
import styles from "./ExchangeBottomSection.module.css";

export default function ExchangeBottomSection(props) {
  const { activeSection } = props.context;

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

  const isDisabled = activeSection === "received";

  return (
    <div className={styles.exchangeBottomSection}>
      <div className={styles.regulatorStove}>
        <div
          className={styles.regulator}
          role="button"
          tabIndex={0}
          onClick={() => !isDisabled && openModal("regulator")}
          aria-disabled={isDisabled}
        >
          Add regulator
        </div>
        <div
          className={styles.stove}
          role="button"
          tabIndex={0}
          onClick={() => !isDisabled && openModal("stove")}
          aria-disabled={isDisabled}
        >
          Add stove
        </div>
      </div>
      <ExchangeSlider activeSection={activeSection} />
      {modalOpen && (
        <AddAccessoryModal
          open={modalOpen}
          onClose={closeModal}
          itemType={modalType}
        />
      )}
    </div>
  );
}
