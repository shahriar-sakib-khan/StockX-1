import { useNavigate } from "react-router-dom";
import { allBrands } from "../../assets/Lists/new_brands_list.jsx";
import Card from "../../components/SelectionComponents/SelectionCard";
import { useBrandStore } from "../../stores/brandStore.js";
import styles from "./Selection.module.css";
import { useEffect } from "react";

function Selection() {
  const selectedBrands = useBrandStore((s) => s.selectedBrands);
  const setSelectedBrands = useBrandStore((s) => s.setSelectedBrands);
  const navigate = useNavigate();

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.some((brand) => brand.id === id)
        ? prev.filter((brand) => brand.id !== id)
        : [...prev, allBrands.find((brand) => brand.id === id)]
    );
  };

  const toggleSelect = () => {
    if (selectedBrands.length === allBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands([...allBrands]);
    }
  };

  const handleSubmit = () => {
    if (selectedBrands.length > 0) {
      navigate("./initialization");
    }
  };

  useEffect(() => {
    console.log(selectedBrands);
  }, [selectedBrands]);

  const allSelected = selectedBrands.length === allBrands.length;
  const isSubmitDisabled = selectedBrands.length === 0;

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
            <button onClick={toggleSelect}>
              {allSelected ? "Deselect All" : "Select All"}
            </button>
            <span className={styles.counter}>
              Selected: {selectedBrands.length} / {allBrands.length}
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
              isSelected={selectedBrands.some((b) => b.id === brand.id)}
              onSelect={() => toggleBrand(brand.id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Selection;
