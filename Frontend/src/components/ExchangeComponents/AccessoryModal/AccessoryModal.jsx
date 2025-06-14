import styles from "./AccessoryModal.module.css";
import { useRef, useState, useEffect } from "react";
import { useExchangeStore } from "../../../stores/exchangeStore";
import { useAccessoryStore } from "../../../stores/AccessoryStore";

export default function AccessoryModal({
  open,
  itemType, // stove or regulator
  prevItem = null,
  onClose,
  mode = "add", // add | edit
}) {
  const dialogRef = useRef(null);
  const countInputRef = useRef(null);

  const [name, setName] = useState("Accessory");
  const [count, setCount] = useState("1");
  const [price, setPrice] = useState("0");

  // exchange store imports
  const addDeliveredItem = useExchangeStore((state) => state.addDeliveredItem);
  const updateDeliveredItem = useExchangeStore(
    (state) => state.updateDeliveredItem
  );

  // accessory store imports
  const getStoveStock = useAccessoryStore((state) => state.getStoveStock);
  const getRegulatorStock = useAccessoryStore(
    (state) => state.getRegulatorStock
  );

  const itemStock =
    itemType === "regulator" ? getRegulatorStock() : getStoveStock();

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && prevItem) {
        setName(prevItem.name || "");
        setCount(prevItem.count?.toString() || "1");
        setPrice(
          prevItem.price !== undefined && prevItem.price !== null
            ? prevItem.price.toString()
            : "0"
        );
      } else {
        setName(itemType === "stove" ? "Stove" : "Regulator");
        setCount("1");
        setPrice("0");
      }
      setTimeout(() => countInputRef.current?.focus(), 0);
    }
  }, [open, mode, prevItem, itemType]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      ...prevItem,
      name,
      count: Number(count),
      price: Number(price),
      productType: itemType,
    };

    if (mode === "edit" && prevItem) {
      updateDeliveredItem(prevItem, item);
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
        <div className={styles.topSection}>
          <h2 className={styles.title}>
            {mode === "edit" ? "Edit" : "Add"}{" "}
            {itemType === "stove" ? "Stove" : "Regulator"}
          </h2>
          <span className={styles.stock}>{itemStock}</span>
        </div>
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
            min={itemStock > 0 ? 1 : 0}
            max={itemStock}
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
          {`${mode === "edit" ? "Save" : "Add"} ${
            itemType === "stove" ? "Stove" : "Regulator"
          }`}
        </button>
      </form>
    </dialog>
  );
}
