// VehicleCard.jsx
import React from "react";
import styles from "./VehicleCard.module.css";
import TruckImage from "../../assets/VehicleImage/Truck.jpg";

const VehicleCard = ({ vehicle, onEdit, onRemove, onCost }) => {
  return (
    <div className={styles.vehicleCard}>
      <img src={TruckImage} alt="Truck" className={styles.vehicleImage} />

      <button className={styles.removeButton} onClick={() => onRemove(vehicle.id)}>
        Remove
      </button>

      <div className={styles.details}>
        <p><strong>Name:</strong> {vehicle.name}</p>
        <p><strong>Registration No:</strong> {vehicle.registrationNumber}</p>
        <p><strong>Contact:</strong> {vehicle.contactNumber}</p>
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
