import React from "react";
import styles from "./ShopPopup.module.css";

const ShopPopup = ({
  isOpen,
  onClose,
  onSubmit,
  shopData,
  onChange,
  isEditing,
}) => {
  if (!isOpen) return null;

  const handleBalanceFocus = (e) => {
    if (e.target.value === "0") e.target.value = "";
  };

  const handleBalanceBlur = (e) => {
    if (e.target.value === "") e.target.value = "0";
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>
          {isEditing ? "Edit Shop" : "Add New Shop"}
        </h2>
        <div className={styles.inputFields}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              value={shopData.name}
              onChange={onChange}
              placeholder="Shop Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="registrationNumber"
              value={shopData.registrationNumber}
              onChange={onChange}
              placeholder="Registration Number"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="ownerName"
              value={shopData.ownerName}
              onChange={onChange}
              placeholder="Owner Name"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="contactNumber"
              value={shopData.contactNumber}
              onChange={onChange}
              placeholder="Contact Number"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="location"
              value={shopData.location}
              onChange={onChange}
              placeholder="Location"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="number"
              name="balance"
              value={shopData.balance}
              onChange={onChange}
              onFocus={handleBalanceFocus}
              onBlur={handleBalanceBlur}
              placeholder="Balance"
              min="0"
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.submitButton} onClick={onSubmit}>
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPopup;
