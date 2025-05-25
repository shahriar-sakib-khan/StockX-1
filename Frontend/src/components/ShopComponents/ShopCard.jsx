import React from "react";
import styles from "./ShopCard.module.css";
import ShopImage from "../../assets/ShopImage/shop.png";

const ShopCard = ({ shop, onEdit, onRemove }) => {
  return (
    <div className={styles.shopCard}>
      <img src={ShopImage} alt="Shop" className={styles.shopImage} />

      <div className={styles.balance}>Balance: {shop.balance}</div>

      <button
        className={styles.removeButton}
        onClick={() => onRemove(shop.id)}
      >
        Remove
      </button>

      <div className={styles.shopDetails}>
        <p><strong>Shop Name:</strong> {shop.name}</p>
        <p><strong>Registration No.:</strong> {shop.registrationNumber}</p>
        <p><strong>Owner Name:</strong> {shop.ownerName}</p>
        <p><strong>Contact Number:</strong> {shop.contactNumber}</p>
        <p><strong>Location:</strong> {shop.location}</p>
      </div>

      <button
        className={styles.editButton}
        onClick={() => onEdit(shop)}
      >
        Edit
      </button>
    </div>
  );
};

export default ShopCard;
