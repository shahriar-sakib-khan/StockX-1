import { useState } from 'react';
import styles from './InventoryCard.module.css';

function InventoryCard({ brand }) {
  const { name, stock: initialStock, description, cylinders } = brand;

  const [selectedType, setSelectedType] = useState('20mm');
  const [selectedSize, setSelectedSize] = useState('20kg');
  const [stock, setStock] = useState(initialStock);

  const cylinderImage =
    cylinders?.find(c => c.type === selectedType)?.image || '';

  const incrementStock = () => setStock(prev => prev + 1);
  const decrementStock = () => setStock(prev => (prev > 0 ? prev - 1 : 0));

  const sizeColors = {
    '5kg': '#FF9999',
    '12kg': '#99CCFF',
    '20kg': '#99FF99',
    '25kg': '#FFD699',
  };

  const prices = {
    '5kg': 550,
    '12kg': 950,
    '20kg': 1450,
    '25kg': 1650,
  };

  const selectedColor = selectedSize ? sizeColors[selectedSize] : 'transparent';
  const selectedPrice = prices[selectedSize];

  return (
    <div
      className={styles.card}
      style={{
        border: '0px solid transparent',
        borderRadius: '12px',
        boxShadow: selectedSize ? `0 0 7px 4px ${selectedColor}` : 'none',
        opacity: selectedSize ? 1 : 0.7,
        transition: 'box-shadow 0.3s ease, opacity 0.3s ease',
      }}
    >
      {/* Top section: Stock + type buttons */}
      <div className={styles.topSection}>
        <div className={styles.stockHeader}>
          <span className={styles.stockLabel}>Stock: {stock}</span>
        </div>

        <div className={styles.topButtons}>
          <button
            className={`${styles.typeButton} ${
              selectedType === '20mm' ? styles.active : ''
            }`}
            onClick={() => setSelectedType('20mm')}
          >
            20mm
          </button>
          <button
            className={`${styles.typeButton} ${
              selectedType === '22mm' ? styles.active : ''
            }`}
            onClick={() => setSelectedType('22mm')}
          >
            22mm
          </button>
        </div>
      </div>

      {/* Cylinder Image */}
      <img
        src={cylinderImage}
        alt={`${name} cylinder`}
        className={styles.logo}
        style={{ borderRadius: '12px' }}
      />

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      {/* Stock Controls */}
      <div className={styles.controls}>
        <button className={styles.minusBtn} onClick={decrementStock}>
          −
        </button>
        <button className={styles.plusBtn} onClick={incrementStock}>
          +
        </button>
      </div>

      {/* Price Display */}
      <div
        className={styles.price}
        style={{
          marginTop: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        Price: {selectedPrice} Tk
      </div>

      {/* Size Buttons */}
      <div className={styles.bottomButtons}>
        {['5kg', '12kg', '20kg', '25kg'].map(size => (
          <button
            key={size}
            className={`${styles.sizeButton} ${
              selectedSize === size ? styles.selected : ''
            }`}
            style={{
              backgroundColor: selectedSize === size ? sizeColors[size] : 'white',
              borderColor: selectedSize === size ? 'black' : '#383844',
              color: selectedSize === size ? 'black' : '#383844',
            }}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InventoryCard;
