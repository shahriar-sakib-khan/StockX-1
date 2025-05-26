import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ShopHistory.module.css";

const ShopHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shop } = location.state || {};

  if (!shop) {
    return (
      <div className={styles.container}>
        <p>No shop data available.</p>
        <button onClick={() => navigate("/dashboard/shop")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Shop History</h2>
      <div className={styles.details}>
        <p><strong>Name:</strong> {shop.name}</p>
        <p><strong>Registration Number:</strong> {shop.registrationNumber}</p>
        <p><strong>Owner Name:</strong> {shop.ownerName}</p>
        <p><strong>Contact Number:</strong> {shop.contactNumber}</p>
        <p><strong>Location:</strong> {shop.location}</p>
        <p><strong>Balance:</strong> {shop.balance}</p>
      </div>
      <button onClick={() => navigate("/dashboard/shop")}>Back to Shops</button>
    </div>
  );
};

export default ShopHistory;
