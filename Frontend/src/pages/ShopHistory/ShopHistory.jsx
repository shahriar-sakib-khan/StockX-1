import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ShopHistory.module.css";

const ShopHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shop } = location.state || {};
  const [activeTab, setActiveTab] = useState("home");

  if (!shop) {
    return (
      <div className={styles.container}>
        <p>No shop data available.</p>
        <button onClick={() => navigate("/dashboard/shop")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <div className={styles.navbar}>
        <button
          className={`${styles.navButton} ${
            activeTab === "home" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("home")}
        >
          Home
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "transaction" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("transaction")}
        >
          Transaction
        </button>
        <button
          className={`${styles.navButton} ${
            activeTab === "review" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("review")}
        >
          Review
        </button>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        <h2>Shop History</h2>

        {activeTab === "home" && (
          <div className={styles.details}>
            <p><strong>Name:</strong> {shop.name}</p>
            <p><strong>Registration Number:</strong> {shop.registrationNumber}</p>
            <p><strong>Owner Name:</strong> {shop.ownerName}</p>
            <p><strong>Contact Number:</strong> {shop.contactNumber}</p>
            <p><strong>Location:</strong> {shop.location}</p>
            <p><strong>Balance:</strong> {shop.balance}</p>
          </div>
        )}

        {activeTab === "transaction" && (
          <div className={styles.details}>
            <p>No transaction history available.</p>
          </div>
        )}

        {activeTab === "review" && (
          <div className={styles.details}>
            <p>No reviews available.</p>
          </div>
        )}

        <button onClick={() => navigate("/dashboard/shop")}>
          Back to Shops
        </button>
      </div>
    </div>
  );
};

export default ShopHistory;
