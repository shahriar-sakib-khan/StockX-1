import InventoryCard from "../../components/InventoryComponents/InventoryCard";
import { useBrandStore } from "../../stores/brandStore";
import styles from "./Inventory.module.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function Inventory() {
  const draftSelectedBrands = useBrandStore(
    (state) => state.draftSelectedBrands
  );
  const initializeDraft = useBrandStore((state) => state.initializeDraft);
  const submitSelectedBrands = useBrandStore(
    (state) => state.submitSelectedBrands
  );
  const hasUncommittedChanges = useBrandStore(
    (state) => state.hasUncommittedChanges
  );

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  const handleConfirm = () => {
    submitSelectedBrands();
  };

  return (
    <main>
      <div className={styles.wrapper}>
        <section className={styles.titleSection}>
          <h2 className={styles.title}>Inventory Page</h2>
          {hasUncommittedChanges() && (
            <button onClick={handleConfirm}>Save Changes</button>
          )}
          <NavLink to="./selection">Select Brands</NavLink>
        </section>

        <section className={styles.listContainer}>
          {draftSelectedBrands.map((brand) => {
            return <InventoryCard key={brand.id} brand={brand} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default Inventory;
