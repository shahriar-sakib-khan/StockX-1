// VehicleCard.jsx
import React from "react";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ vehicle, onEdit, onRemove, onCost }) => {
  return (
    <div className={styles.vehicleCard}>
      <button className={styles.removeButton} onClick={() => onRemove(vehicle.id)}>
        Remove
      </button>

      <div className={styles.details}>
        <p>
          <strong>Name:</strong> {vehicle.name}
        </p>
        <p>
          <strong>Registration No:</strong> {vehicle.registrationNumber}
        </p>
        <p>
          <strong>Contact:</strong> {vehicle.contactNumber}
        </p>
      </div>

      <button className={styles.editButton} onClick={() => onEdit(vehicle)}>
        Edit
      </button>

      <button className={styles.costButton} onClick={() => onCost?.(vehicle)}>
        Cost
      </button>
    </div>
  );
};

export default VehicleCard;
