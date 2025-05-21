import React, { useState, useEffect } from "react";
import styles from "./Vehicles.module.css";
import VehicleCard from "../../components/VehicleComponents/VehicleCard";
import VehiclePopup from "../../components/VehicleComponents/VehiclePopup";

const Vehicles = () => {
  const loadInitialVehicleData = () => {
    const savedVehicleData = localStorage.getItem("vehicleData");
    return savedVehicleData ? JSON.parse(savedVehicleData) : [];
  };

  const [vehicleData, setVehicleData] = useState(loadInitialVehicleData);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    registrationNumber: "",
    contactNumber: "",
    fuelCost: "",
    maintenanceCost: "",
  });

  const [addVehicleCardMoved, setAddVehicleCardMoved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [vehicleToRemove, setVehicleToRemove] = useState(null);

  useEffect(() => {
    localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
  }, [vehicleData]);

  const handleAddVehicle = () => {
    if (editingVehicleId !== null) {
      const updatedList = vehicleData.map((vehicle) =>
        vehicle.id === editingVehicleId ? { ...vehicle, ...newVehicle } : vehicle
      );
      setVehicleData(updatedList);
      setEditingVehicleId(null);
    } else {
      const updatedVehicle = {
        id: Date.now(),
        ...newVehicle,
      };
      setVehicleData([...vehicleData, updatedVehicle]);
    }

    setNewVehicle({
      name: "",
      registrationNumber: "",
      contactNumber: "",
      fuelCost: "",
      maintenanceCost: "",
    });

    setAddVehicleCardMoved(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveVehicle = (id) => {
    setVehicleToRemove(vehicleData.find((v) => v.id === id));
    setIsRemovePopupOpen(true);
  };

  const handleConfirmRemove = () => {
    setVehicleData(vehicleData.filter((v) => v.id !== vehicleToRemove.id));
    setIsRemovePopupOpen(false);
    setVehicleToRemove(null);
  };

  const handleCancelRemove = () => {
    setIsRemovePopupOpen(false);
    setVehicleToRemove(null);
  };

  const handleEditClick = (vehicle) => {
    setNewVehicle(vehicle);
    setEditingVehicleId(vehicle.id);
    setIsPopupOpen(true);
  };

  const handleAddCardClick = () => {
    setNewVehicle({
      name: "",
      registrationNumber: "",
      contactNumber: "",
      fuelCost: "",
      maintenanceCost: "",
    });
    setIsPopupOpen(true);
    setEditingVehicleId(null);
  };

  const handleCostClick = (vehicle) => {
    alert(
      `Vehicle: ${vehicle.name}\nFuel Cost: ${vehicle.fuelCost || "N/A"}\nMaintenance Cost: ${vehicle.maintenanceCost || "N/A"}`
    );
  };

  return (
    <div className={styles.vehicleContainer}>
      {/* Add/Edit Popup */}
      <VehiclePopup
        isOpen={isPopupOpen}
        newVehicle={newVehicle}
        editingVehicleId={editingVehicleId}
        onClose={() => {
          setIsPopupOpen(false);
          setEditingVehicleId(null);
        }}
        onChange={handleInputChange}
        onSubmit={() => {
          handleAddVehicle();
          setIsPopupOpen(false);
        }}
      />

      {/* Remove Popup */}
      {isRemovePopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Are you sure you want to remove this vehicle?</h2>
            <div className={styles.popupButtons}>
              <button className={styles.cancelButton} onClick={handleCancelRemove}>
                No
              </button>
              <button className={styles.addButton} onClick={handleConfirmRemove}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Grid */}
      <div className={styles.vehiclesGrid}>
        {vehicleData.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={handleEditClick}
            onRemove={handleRemoveVehicle}
            onCost={handleCostClick}
          />
        ))}

        <div
          className={`${styles.addVehicleCard} ${
            addVehicleCardMoved ? styles.moveRight : ""
          }`}
          onClick={handleAddCardClick}
        >
          <div className={styles.addVehicleText}>Add Vehicle</div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
