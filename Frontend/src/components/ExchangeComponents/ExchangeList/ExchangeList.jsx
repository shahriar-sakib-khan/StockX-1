import styles from "./ExchangeList.module.css";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import AddAccessoryModal from "../AddAccessoryModal/AddAccessoryModal";
import ExchangeModal from "../ExchangeModal/ExchangeModal";

export default function ExchangeList({
  type = "delivered" | "received",
  active = false,
  onClick,
  className = "",
}) {
  const { deliveredItems, setDeliveredItems } = useOutletContext();
  const [editIndex, setEditIndex] = useState(null);
  const [editModalType, setEditModalType] = useState(null); // "stove" or "regulator"
  const [editInitialValues, setEditInitialValues] = useState(null);
  const [editCylinder, setEditCylinder] = useState(null);

  // Group items by productType
  const itemsList =
    type === "delivered"
      ? Array.isArray(deliveredItems)
        ? deliveredItems
        : []
      : [];

  const groups = [
    { label: "Regulators", type: "regulator" },
    { label: "Stoves", type: "stove" },
    { label: "Cylinders", type: "cylinder" },
  ];

  // Remove item handler
  const handleRemove = (idx) => {
    const newList = itemsList.filter((_, i) => i !== idx);
    setDeliveredItems(newList);
  };

  // Edit item handler
  const handleEdit = (item, idx) => {
    if (item.productType === "regulator" || item.productType === "stove") {
      setEditModalType(item.productType);
      setEditInitialValues({ ...item, idx });
      setEditIndex(idx);
    } else if (item.productType === "cylinder") {
      setEditCylinder({ ...item, idx });
    }
  };

  // Handle modal save
  const handleEditSave = (updatedItem) => {
    const newList = itemsList.map((item, idx) =>
      idx === editIndex ? { ...item, ...updatedItem } : item
    );
    setDeliveredItems(newList);
    setEditIndex(null);
    setEditModalType(null);
    setEditInitialValues(null);
  };

  // Table header
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

  // Render grouped rows
  const groupedRows = groups
    .map((group) => {
      const groupItems = itemsList
        .map((item, idx) => ({ ...item, idx }))
        .filter((item) => item.productType === group.type);

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
          {groupItems.map((item) => (
            <tr key={item.idx}>
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
                  onClick={() => handleEdit(item, item.idx)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.idx)}
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
      {editModalType && (
        <AddAccessoryModal
          open={!!editModalType}
          onClose={() => {
            setEditIndex(null);
            setEditModalType(null);
            setEditInitialValues(null);
          }}
          itemType={editModalType}
          initialValues={editInitialValues}
          onSave={handleEditSave}
        />
      )}
      {editCylinder && (
        <ExchangeModal
          open={!!editCylinder}
          onClose={() => setEditCylinder(null)}
          card={{
            brandId: editCylinder.id,
            brandName: editCylinder.name,
            price: editCylinder.price,
            productType: "cylinder",
          }}
          activeSection="delivered"
          initialValues={{
            type: editCylinder.type,
            size: editCylinder.size,
            count: editCylinder.count,
            price: editCylinder.price,
            idx: editCylinder.idx,
          }}
        />
      )}
    </div>
  );
}
