import React from "react";
import styles from "./VehiclePopup.module.css";

const VehiclePopup = ({
  isOpen,
  newVehicle,
  editingVehicleId,
  onClose,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2>{editingVehicleId ? "Edit Vehicle" : "Add New Vehicle"}</h2>
        <div className={styles.inputFields}>
          {["name", "registrationNumber", "contactNumber", "fuelCost", "maintenanceCost"].map(
            (field) => (
              <div className={styles.Input} key={field}>
                <input
                  type={["fuelCost", "maintenanceCost"].includes(field) ? "number" : "text"}
                  name={field}
                  value={newVehicle[field] || ""}
                  onChange={onChange}
                  min="0"
                />
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
              </div>
            )
          )}
        </div>
        <div className={styles.popupButtons}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.addButton} onClick={onSubmit}>
            {editingVehicleId ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiclePopup;
