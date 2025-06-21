import styles from "./ExchangeList.module.css";
import { useState } from "react";
import AccessoryModal from "../AccessoryModal/AccessoryModal";
import CylinderModal from "../CylinderModal/CylinderModal";
import { useExchangeStore } from "../../../stores/exchangeStore";
import { useBrandStore } from "../../../stores/brandStore";
import { useAccessoryStore } from "../../../stores/AccessoryStore";

export default function ExchangeList({
  section = "delivered" | "received",
  active = false,
  onClick,
  className = "",
}) {
  const [modalType, setModalType] = useState(null); // "regulator" | "stove" | "cylinder"
  const [prevItem, setPrevItem] = useState(null); // Item being edited

  // exchange store imports
  const deliveredItems = useExchangeStore((state) => state.deliveredItems);
  const removeDeliveredItem = useExchangeStore(
    (state) => state.removeDeliveredItem
  );
  const receivedItems = useExchangeStore((state) => state.receivedItems);
  const removeReceivedItem = useExchangeStore(
    (state) => state.removeReceivedItem
  );

  // brand store imports
  const clearCylinderStockChangesById = useBrandStore(
    (state) => state.clearCylinderStockChangesById
  );

  // accessory store imports
  const clearRegulatorStockChanges = useAccessoryStore(
    (state) => state.clearRegulatorStockChanges
  );
  const clearStoveStockChanges = useAccessoryStore(
    (state) => state.clearStoveStockChanges
  );

  const isDelivered = section === "delivered";
  const itemsList = isDelivered ? deliveredItems : receivedItems;

  const groups = [
    { label: "Regulators", type: "regulator" },
    { label: "Stoves", type: "stove" },
    { label: "Cylinders", type: "cylinder" },
  ];

  const handleRemove = (item) => {
    if (isDelivered) {
      if (item.productType === "cylinder") {
        const cylinderId = [item?.id, item?.type, item?.size].join("-");
        clearCylinderStockChangesById({
          brandId: item?.id,
          cylinderId: cylinderId,
        });
      } else if (item.productType === "regulator") {
        clearRegulatorStockChanges();
      } else if (item.productType === "stove") {
        clearStoveStockChanges();
      }
      removeDeliveredItem(item);
    } else {
      removeReceivedItem(item);
    }
  };

  const handleEdit = (item) => {
    setModalType(item.productType);
    setPrevItem(item);
  };

  const tableHeader = (
    <thead>
      <tr>
        <th>Name</th>
        <th>Count</th>
        {isDelivered && <th>Price</th>}
        <th>Actions</th>
      </tr>
    </thead>
  );

  const groupedRows = groups
    .map((group) => {
      const groupItems = itemsList.filter(
        (item) => item.productType === group.type
      );

      if (groupItems.length === 0) return null;

      return (
        <tbody key={group.type}>
          <tr>
            <td colSpan={isDelivered ? 4 : 3} className={styles.groupHeading}>
              {group.label}
            </td>
          </tr>
          {groupItems.map((item, i) => (
            <tr key={i}>
              <td>
                {item.name}
                {item.productType === "cylinder" && (
                  <>
                    {" "}
                    [{item.size}-{item.type}]
                  </>
                )}
              </td>
              <td>{item.count}</td>
              {isDelivered && <td>{item.price}</td>}
              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(item)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item)}
                  type="button"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      );
    })
    .filter(Boolean);

  return (
    <div
      className={[
        styles.exchangeListContainer,
        active ? styles.active : "",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      <div className={styles.heading}>
        {isDelivered ? "Delivered" : "Received"}
      </div>
      <div className={styles.list}>
        <table className={styles.exchangeTable}>
          {tableHeader}
          {groupedRows}
        </table>
      </div>

      {modalType === "regulator" || modalType === "stove" ? (
        <AccessoryModal
          open={!!modalType}
          onClose={() => {
            setModalType(null);
            setPrevItem(null);
          }}
          itemType={modalType}
          prevItem={prevItem}
          mode="edit"
        />
      ) : modalType === "cylinder" ? (
        <CylinderModal
          open={true}
          card={prevItem}
          activeSection={section}
          onClose={() => {
            setModalType(null);
            setPrevItem(null);
          }}
          mode="edit"
        />
      ) : null}
    </div>
  );
}
