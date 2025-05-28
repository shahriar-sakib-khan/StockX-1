import { useOutletContext } from "react-router-dom";
import InventoryCard from "../../components/InventoryComponents/InventoryCard";
import styles from "./Inventory.module.css";

import allBrands from "../../components/SelectionComponents/List_of_Brands"; // You can move the large allBrands array into a separate file

function Inventory() {
  const { selectedBrands } = useOutletContext();

  return (
    <main>
      <div className={styles.wrapper}>
        <section className={styles.titleSection}>
          <h2 className={styles.title}>Inventory Page</h2>
          
        </section>

        <section className={styles.listContainer}>
          {selectedBrands.map((brand) => {
            const fullBrandData = allBrands.find((b) => b.id === brand.id);
            return (
              <InventoryCard
                key={brand.id}
                brand={fullBrandData}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Inventory;
