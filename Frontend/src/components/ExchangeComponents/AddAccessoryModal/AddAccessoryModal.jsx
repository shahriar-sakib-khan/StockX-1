import styles from "./AddAccessoryModal.module.css";
import { useRef, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useStovesStore, useRegulatorsStore } from "../../../stores";

export default function AddAccessoryModal({
  open,
  onClose,
  itemType, // "stove" or "regulator"
  initialValues = null,
  onSave, // optional, for edit mode
}) {
  const dialogRef = useRef(null);
  const countInputRef = useRef(null);

  // Get lists and setters from zustand stores
  const stoves = useStovesStore((state) => state.stoves);
  const setStoves = useStovesStore((state) => state.setStoves);
  const regulators = useRegulatorsStore((state) => state.regulators);
  const setRegulators = useRegulatorsStore((state) => state.setRegulators);

  // Get delivered items and setter from outlet context
  const { deliveredItems, setDeliveredItems } = useOutletContext();

  const [name, setName] = useState("");
  const [count, setCount] = useState("1");
  const [price, setPrice] = useState("");

  // Set initial values when modal opens for editing
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (open && initialValues) {
      setName(initialValues.name || "");
      setCount(initialValues.count?.toString() || "1");
      setPrice(initialValues.price?.toString() || "");
      // Focus on count field after values are set
      setTimeout(() => {
        countInputRef.current?.focus();
      }, 0);
    } else if (open) {
      setName(itemType === "stove" ? "Stove" : "Regulator");
      setCount("1");
      setPrice("");
    }
  }, [open, initialValues, itemType]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      name,
      count: Number(count),
      price: Number(price),
      productType: itemType, // "stove" or "regulator"
    };

    // If editing, call onSave and close
    if (typeof onSave === "function" && initialValues) {
      onSave(item);
      onClose();
      return;
    }

    // Add to delivered items (from outlet context)
    const currentList = Array.isArray(deliveredItems) ? deliveredItems : [];
    const existingIndex = currentList.findIndex(
      (i) => i.name === item.name && i.productType === item.productType
    );

    let newList;
    if (existingIndex !== -1) {
      // Update count for existing item
      newList = currentList.map((i, idx) =>
        idx === existingIndex
          ? { ...i, count: i.count + item.count, price: item.price }
          : i
      );
    } else {
      // Add new item
      newList = [...currentList, item];
    }
    setDeliveredItems(newList);

    // Optionally update the stoves/regulators store as well
    if (itemType === "stove") {
      setStoves([...(Array.isArray(stoves) ? stoves : []), item]);
    } else if (itemType === "regulator") {
      setRegulators([...(Array.isArray(regulators) ? regulators : []), item]);
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
          {initialValues ? "Edit" : "Add"}{" "}
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
          {initialValues
            ? `Save ${itemType === "stove" ? "Stove" : "Regulator"}`
            : `Add ${itemType === "stove" ? "Stove" : "Regulator"}`}
        </button>
      </form>
    </dialog>
  );
}
