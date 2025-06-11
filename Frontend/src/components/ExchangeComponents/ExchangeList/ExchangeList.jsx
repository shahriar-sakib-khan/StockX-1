import styles from "./ExchangeList.module.css";
import { useState } from "react";
import AccessoryModal from "../AccessoryModal/AccessoryModal";
import CylinderModal from "../CylinderModal/CylinderModal";
import { useExchangeStore } from "../../../stores/exchangeStore";

export default function ExchangeList({
  type = "delivered" | "received",
  active = false,
  onClick,
  className = "",
}) {
  const {
    deliveredItems,
    receivedItems,
    removeDeliveredItem,
    removeReceivedItem,
    updateDeliveredItem,
    updateReceivedItem,
  } = useExchangeStore();

  const [modalType, setModalType] = useState(null); // "regulator" | "stove" | "cylinder"
  const [prevItem, setPrevItem] = useState(null); // Item being edited

  const itemsList = type === "delivered" ? deliveredItems : receivedItems;

  const groups = [
    { label: "Regulators", type: "regulator" },
    { label: "Stoves", type: "stove" },
    { label: "Cylinders", type: "cylinder" },
  ];

  const handleRemove = (item) => {
    if (type === "delivered") {
      removeDeliveredItem(item);
    } else {
      removeReceivedItem(item);
    }
  };

  const handleEdit = (item) => {
    setModalType(item.productType);
    setPrevItem(item);
  };

  const handleEditSave = (prevItem, updatedItem) => {
    if (type === "delivered") {
      updateDeliveredItem(prevItem, updatedItem);
    } else {
      updateReceivedItem(prevItem, updatedItem);
    }
    setModalType(null);
    setPrevItem(null);
  };

  const tableHeader = (
    <thead>
      <tr>
        <th>Name</th>
        <th>Count</th>
        {type === "delivered" && <th>Price</th>}
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
            <td
              colSpan={type === "delivered" ? 4 : 3}
              className={styles.groupHeading}
            >
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
              {type === "delivered" && <td>{item.price}</td>}
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
        {type === "delivered" ? "Delivered" : "Received"}
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
          initialValues={prevItem}
          mode="edit"
          onSave={handleEditSave}
        />
      ) : modalType === "cylinder" ? (
        <CylinderModal
          open={true}
          card={prevItem}
          activeSection={type}
          onClose={() => {
            setModalType(null);
            setPrevItem(null);
          }}
          mode="edit"
          onSave={handleEditSave}
        />
      ) : null}
    </div>
  );
}
