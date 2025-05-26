import React from "react";
import styles from "./ShopCard.module.css";
import ShopImage from "../../assets/ShopImage/shop.jpg";

const ShopCard = ({ shop, onEdit, onRemove, onClick }) => {
  return (
    <div className={styles.shopCard} onClick={() => onClick(shop)}>
      <img src={ShopImage} alt="Shop" className={styles.shopImage} />

      <div className={styles.shopDetails}>
        <p><strong>Shop Name:</strong> {shop.name}</p>
        <p><strong>Owner Name:</strong> {shop.ownerName}</p>
      </div>

      <div className={styles.balance}>Balance: {shop.balance}</div>

      <button
        className={styles.editButton}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(shop);
        }}
      >
        Edit
      </button>

      <button
        className={styles.removeButton}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(shop.id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default ShopCard;
