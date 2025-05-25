import styles from './SelectionCard.module.css';

function SelectionCard({ id, name, logo, isSelected, onSelect }) {
  
  return (
    <div className={[styles.card, isSelected ? styles.selected : ''].join(' ')}
        onClick={() => onSelect(id)}>
      <img src={logo} alt={name} className={styles.logo}></img>
      <p className={styles.name}>{name}</p>
    </div>
  );
}

export default SelectionCard;