import styles from "./AccessoryModal.module.css";
import { useRef, useState, useEffect } from "react";
import { useExchangeStore } from "../../../stores/exchangeStore";

export default function AccessoryModal({
  open,
  onClose,
  itemType, // stove or regulator
  initialValues = null,
  mode = "add", // add | edit
}) {
  const dialogRef = useRef(null);
  const countInputRef = useRef(null);

  const [name, setName] = useState("Accessory");
  const [count, setCount] = useState("1");
  const [price, setPrice] = useState("0");

  const addDeliveredItem = useExchangeStore((state) => state.addDeliveredItem);
  const updateDeliveredItem = useExchangeStore(
    (state) => state.updateDeliveredItem
  );

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        setName(initialValues.name || "");
        setCount(initialValues.count?.toString() || "1");
        setPrice(
          initialValues.price !== undefined && initialValues.price !== null
            ? initialValues.price.toString()
            : "0"
        );
      } else {
        setName(itemType === "stove" ? "Stove" : "Regulator");
        setCount("1");
        setPrice("0");
      }
      setTimeout(() => countInputRef.current?.focus(), 0);
    }
  }, [open, mode, initialValues, itemType]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      ...initialValues,
      name,
      count: Number(count),
      price: Number(price),
      productType: itemType,
    };

    if (mode === "edit" && initialValues) {
      updateDeliveredItem(initialValues, item);
    } else {
      addDeliveredItem(item);
    }

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          {mode === "edit" ? "Edit" : "Add"}{" "}
          {itemType === "stove" ? "Stove" : "Regulator"}
        </h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="count">Count</label>
          <input
            id="count"
            type="number"
            min="1"
            value={count}
            required
            ref={countInputRef}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          {mode === "edit"
            ? `Save ${itemType === "stove" ? "Stove" : "Regulator"}`
            : `Add ${itemType === "stove" ? "Stove" : "Regulator"}`}
        </button>
      </form>
    </dialog>
  );
}
