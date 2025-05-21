import React from "react";
import styles from "./ShopAdd.module.css";

const ShopAdd = ({ onClick, moved }) => {
  return (
    <div
      className={`${styles.addShopCard} ${moved ? styles.moveRight : ""}`}
      onClick={onClick}
    >
      <div className={styles.addShopText}>Add Shop</div>
    </div>
  );
};

export default ShopAdd;
