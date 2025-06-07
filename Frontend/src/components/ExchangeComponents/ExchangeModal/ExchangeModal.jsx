import styles from "./ExchangeModal.module.css";
import { useRef, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function ExchangeModal({
  open,
  onClose,
  card,
  activeSection,
  initialValues = null,
}) {
  const dialogRef = useRef(null);
  const priceInputRef = useRef(null);

  // Import lists and setters from zustand stores

  // Get delivered/received items and setters from outlet context
  const { deliveredItems, setDeliveredItems, receivedItems, setReceivedItems } =
    useOutletContext();

  // State for form fields
  const [type, setType] = useState("20mm");
  const [size, setSize] = useState("5kg");
  const [count, setCount] = useState("1");
  const [price, setPrice] = useState(card?.price || 1000);
  const [isPriceEditable, setIsPriceEditable] = useState(false);

  // Show/hide dialog
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  // Set form fields from initialValues (edit) or defaults (add)
  useEffect(() => {
    if (open && initialValues) {
      setType(initialValues.type || "20mm");
      setSize(initialValues.size || "5kg");
      setCount(initialValues.count?.toString() || "1");
      setPrice(
        initialValues.price?.toString() || card?.price?.toString() || "1000"
      );
      setIsPriceEditable(false);
    } else if (open) {
      setType("20mm");
      setSize("5kg");
      setCount("1");
      setPrice(card?.price?.toString() || "1000");
      setIsPriceEditable(false);
    }
  }, [open, initialValues, card]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: card?.brandId ?? initialValues?.id,
      name: card?.brandName ?? initialValues?.name,
      type,
      size,
      count: Number(count),
      price: Number(price),
      productType:
        card?.productType || initialValues?.productType || "cylinder",
    };

    // Edit mode
    if (initialValues && typeof initialValues.idx === "number") {
      if (activeSection === "delivered") {
        const currentList = Array.isArray(deliveredItems) ? deliveredItems : [];
        const newList = currentList.map((i, idx) =>
          idx === initialValues.idx ? { ...i, ...item } : i
        );
        setDeliveredItems(newList);
      } else if (activeSection === "received") {
        const currentList = Array.isArray(receivedItems) ? receivedItems : [];
        const newList = currentList.map((i, idx) =>
          idx === initialValues.idx ? { ...i, ...item } : i
        );
        setReceivedItems(newList);
      }
      onClose();
      return;
    }

    // Add mode
    if (activeSection === "delivered") {
      const currentList = Array.isArray(deliveredItems) ? deliveredItems : [];
      setDeliveredItems([...currentList, item]);
    } else if (activeSection === "received") {
      const currentList = Array.isArray(receivedItems) ? receivedItems : [];
      setReceivedItems([...currentList, item]);
    }
    onClose();
  };

  const name = card?.brandName || "Brand Name";
  const model = [size, type].join("-"); // 5kg-20mm

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.topSection}>
        <h2 className={styles.brand}>{name}</h2>
        <button onClick={onClose} className={styles.cancelBtn}>
          X
        </button>
      </div>
      <div className={styles.subTopSection}>
        <h3 className={styles.modelName}>Model: {model}</h3>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="type">Select type</label>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="20mm">20 mm</option>
            <option value="22mm">22 mm</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="size">Select size</label>
          <select
            name="size"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="5kg">5 kg</option>
            <option value="10kg">10 kg</option>
            <option value="15kg">15 kg</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="count">Enter count</label>
          <input
            type="number"
            id="count"
            min="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        {activeSection == "delivered" && (
          <div className={styles.formGroup}>
            <label htmlFor="price">Enter price</label>
            <input
              type="number"
              id="price"
              className={styles.priceInput}
              min="0"
              value={price}
              ref={priceInputRef}
              readOnly={!isPriceEditable}
              onBlur={() => setIsPriceEditable(false)}
              onChange={(e) => setPrice(e.target.value)}
            />
            {!isPriceEditable && (
              <span className={styles.priceInputTaka}>tk</span>
            )}
            <svg
              className="feather feather-edit"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setIsPriceEditable(true);
                setTimeout(() => priceInputRef.current?.focus(), 0);
              }}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </dialog>
  );
}
