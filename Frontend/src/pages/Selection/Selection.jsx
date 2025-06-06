import { useNavigate } from "react-router-dom";
import Card from "../../components/SelectionComponents/SelectionCard";
import { useBrandStore } from "../../stores/brandStore.js";
import styles from "./Selection.module.css";
import { useEffect } from "react";

function Selection() {
  const navigate = useNavigate();

  // Use draftSelectedBrands for instant UI update (not committed yet)
  const draftSelectedBrands = useBrandStore((s) => s.draftSelectedBrands);
  const allBrands = useBrandStore((s) => s.allBrands);

  const toggleSingleBrand = useBrandStore((s) => s.toggleSingleBrand);
  const toggleAllBrandsSelection = useBrandStore(
    (s) => s.toggleAllBrandsSelection
  );
  const submitSelectedBrands = useBrandStore((s) => s.submitSelectedBrands);
  const initializeDraft = useBrandStore((s) => s.initializeDraft);

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  const handleSubmit = () => {
    if (draftSelectedBrands.length > 0) {
      submitSelectedBrands();
      navigate("./initialization");
    }
  };

  const allSelected = draftSelectedBrands.length === allBrands.length;
  const isSubmitDisabled = draftSelectedBrands.length === 0;

  return (
    <main>
      <div className={styles.wrapper}>
        <section className={styles.titleSection}>
          <div className={styles.titleSubmit}>
            <h2 className={styles.title}>Selection Page</h2>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              data-tooltip="Select a brand to proceed"
            >
              Submit
            </button>
          </div>
          <div className={styles.selectCount}>
            <button onClick={toggleAllBrandsSelection}>
              {allSelected ? "Deselect All" : "Select All"}
            </button>
            <span className={styles.counter}>
              Selected: {draftSelectedBrands.length} / {allBrands.length}
            </span>
          </div>
        </section>

        <section className={styles.listContainer}>
          {allBrands.map((brand) => (
            <Card
              key={brand.id}
              id={brand.id}
              name={brand.name}
              logo={brand.logo}
              isSelected={draftSelectedBrands.some((b) => b.id === brand.id)}
              onSelect={() => toggleSingleBrand(brand.id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Selection;
