import styles from "./CylinderModal.module.css";
import { useRef, useState, useEffect } from "react";
import { useExchangeStore } from "../../../stores/exchangeStore";
import { useBrandStore } from "../../../stores/brandStore";

export default function CylinderModal({
  open,
  card = null,
  activeSection, // delivered | received
  onClose,
  mode, // add | edit
}) {
  let prevItem = mode === "edit" ? card : null;

  const dialogRef = useRef(null);
  const priceInputRef = useRef(null);

  // exchange store imports
  const addDeliveredItem = useExchangeStore((state) => state.addDeliveredItem);
  const addReceivedItem = useExchangeStore((state) => state.addReceivedItem);
  const updateDeliveredItem = useExchangeStore(
    (state) => state.updateDeliveredItem
  );
  const updateReceivedItem = useExchangeStore(
    (state) => state.updateReceivedItem
  );

  // brand store imports
  const getCylinderStockById = useBrandStore(
    (state) => state.getCylinderStockById
  );
  const setDraftCylinderStock = useBrandStore(
    (state) => state.setDraftCylinderStock
  );

  const [type, setType] = useState("20mm");
  const [size, setSize] = useState("12kg");
  const [count, setCount] = useState("1");
  const [price, setPrice] = useState(card?.price?.toString() || "1450");
  const [isPriceEditable, setIsPriceEditable] = useState(false);

  const cylinderId = card ? [card.id, type, size].join("-") : null;
  const itemStock = getCylinderStockById({
    brandId: card?.id,
    cylinderId: cylinderId,
  });

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (open && mode == "edit") {
      setType(prevItem.type);
      setSize(prevItem.size);
      setCount(prevItem.count);
      setPrice(prevItem.price?.toString());
      setIsPriceEditable(false);
    } else if (open) {
      setType("20mm");
      setSize("12kg");
      setCount(1);
      setPrice(card?.price?.toString() || "1450");
      setIsPriceEditable(false);
    }
  }, [open, prevItem, card, mode]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      id: card?.id,
      name: card?.name,
      type,
      size,
      count: Number(count),
      price: Number(price),
      productType: card?.productType || "cylinder",
    };

    if (mode === "edit" && prevItem) {
      if (activeSection === "delivered") updateDeliveredItem(prevItem, item);
      else if (activeSection === "received") updateReceivedItem(prevItem, item);
    } else {
      if (activeSection === "delivered") addDeliveredItem(item);
      else if (activeSection === "received") addReceivedItem(item);
    }

    if (activeSection === "delivered") {
      setDraftCylinderStock({
        brandId: card?.id,
        cylinderId: cylinderId,
        newStock: itemStock - count,
      });
    }

    onClose();
  };

  const name = card?.name || "Brand Name";
  const model = [type, size].join("-"); // eg: 20mm-12kg

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.topSection}>
        <h2 className={styles.brand}>{name}</h2>
        <span className={styles.stock}>{itemStock}</span>
        {/* <button onClick={onClose} className={styles.cancelBtn}>
          X
        </button> */}
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
            <option value="12kg">12 kg</option>
            <option value="20kg">20 kg</option>
            <option value="25kg">25 kg</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="count">Enter count</label>
          <input
            type="number"
            id="count"
            min={itemStock > 0 ? 1 : 0}
            max={activeSection === "delivered" ? itemStock : null}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        {activeSection === "delivered" && (
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
          {`${mode === "edit" ? "Save" : "Add"} Cylinder`}
        </button>
      </form>
    </dialog>
  );
}
