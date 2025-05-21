import React, { useState, useEffect } from "react";
import styles from "./Shop.module.css";
import ShopCard from "../../components/ShopComponents/ShopCard";
import ShopPopup from "../../components/ShopComponents/ShopPopup";

const Shop = () => {
  const loadInitialShopData = () => {
    const savedShopData = localStorage.getItem("shopData");
    return savedShopData ? JSON.parse(savedShopData) : [];
  };

  const [shopData, setShopData] = useState(loadInitialShopData);
  const [newShop, setNewShop] = useState({
    name: "",
    registrationNumber: "",
    ownerName: "",
    contactNumber: "",
    location: "",
    balance: 0,
  });

  const [addShopCardMoved, setAddShopCardMoved] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [shopToRemove, setShopToRemove] = useState(null);
  const [editingShopId, setEditingShopId] = useState(null);

  useEffect(() => {
    localStorage.setItem("shopData", JSON.stringify(shopData));
  }, [shopData]);

  const handleAddShop = () => {
    if (editingShopId !== null) {
      const updatedShopList = shopData.map((shop) =>
        shop.id === editingShopId ? { ...shop, ...newShop } : shop
      );
      setShopData(updatedShopList);
      setEditingShopId(null);
    } else {
      const updatedShopData = {
        id: Date.now(),
        ...newShop,
      };
      const updatedShopList = [...shopData, updatedShopData];
      setShopData(updatedShopList);
    }

    setNewShop({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      location: "",
      balance: 0,
    });

    setAddShopCardMoved(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prevShop) => ({
      ...prevShop,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleRemoveShop = (shopId) => {
    setShopToRemove(shopId);
    setIsRemovePopupOpen(true);
  };

  const confirmRemoveShop = () => {
    const updatedShopList = shopData.filter((shop) => shop.id !== shopToRemove);
    setShopData(updatedShopList);
    setIsRemovePopupOpen(false);
    setShopToRemove(null);
  };

  const cancelRemoveShop = () => {
    setIsRemovePopupOpen(false);
    setShopToRemove(null);
  };

  const handleEditClick = (shop) => {
    setNewShop(shop);
    setEditingShopId(shop.id);
    setIsPopupOpen(true);
  };

  const handleAddShopCardClick = () => {
    setNewShop({
      name: "",
      registrationNumber: "",
      ownerName: "",
      contactNumber: "",
      location: "",
      balance: 0,
    });
    setIsPopupOpen(true);
    setEditingShopId(null);
  };

  const handleBalanceFocus = (e) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  const handleBalanceBlur = (e) => {
    if (e.target.value === "") {
      e.target.value = "0";
    }
  };

  return (
    <div className={styles.shopContainer}>
      {isRemovePopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Confirm Removal</h2>
            <p>Are you sure you want to remove this shop?</p>
            <div className={styles.popupButtons}>
              <button className={styles.cancelButton} onClick={cancelRemoveShop}>
                Cancel
              </button>
              <button className={styles.addButton} onClick={confirmRemoveShop}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ShopPopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          setEditingShopId(null);
        }}
        onSubmit={() => {
          handleAddShop();
          setIsPopupOpen(false);
        }}
        shopData={newShop}
        onChange={handleInputChange}
        editingShopId={editingShopId}
        handleBalanceFocus={handleBalanceFocus}
        handleBalanceBlur={handleBalanceBlur}
      />

      <div className={styles.shopsGrid}>
        {shopData.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            onEdit={handleEditClick}
            onRemove={handleRemoveShop}
          />
        ))}

        <div
          className={`${styles.addShopCard} ${addShopCardMoved ? styles.moveRight : ""}`}
          onClick={handleAddShopCardClick}
        >
          <div className={styles.addShopText}>Add Shop</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
