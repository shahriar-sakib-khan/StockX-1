import styles from "./RenderTableRows.module.css";

export default function RenderTableRowsDelivered() {
  let serial = 1;
  const rows = [];
  // let finalPrice = 0;
  // let paid = 0;

  // Iterate over the types of products (cylinder, regulator, stove)
  Object.keys(deliveredItems).forEach((productType) => {
    const items = deliveredItems[productType];

    // Iterate over each item (brandId) within the current productType
    Object.keys(items).forEach((id) => {
      const details = items[id];
      const Name =
        productType === "cylinder" ? details.brandName : details.productName;

      if (productType === "cylinder") {
        // Handle cylinders (which include cylinderType)
        Object.keys(details).forEach((cylinderType) => {
          const info = details[cylinderType];
          const totalPrice = info.price * info.quantity;
          if (!isNaN(totalPrice)) finalPrice += totalPrice;

          if (cylinderType !== "brandName")
            rows.push(
              <tr
                className={styles.tableBodyRow}
                key={`${productType}-${id}-${cylinderType}`}
              >
                <td
                  className={styles.tableBodyRowItem}
                  data-cell="#: "
                  role="cell"
                >
                  {serial++}
                </td>
                <td
                  className={styles.tableBodyRowItem}
                  data-cell="Brand: "
                  role="cell"
                >
                  {Name || "Unknown"} [{cylinderType}]
                </td>
                <td
                  className={styles.tableBodyRowItem}
                  data-cell="Price: "
                  role="cell"
                >
                  Tk {info.price}
                </td>
                <td
                  className={styles.tableBodyRowItem}
                  data-cell="Quantity: "
                  role="cell"
                >
                  {info.quantity}
                </td>
                <td
                  className={styles.tableBodyRowItem}
                  data-cell="Total: "
                  role="cell"
                >
                  Tk {totalPrice}
                </td>
                {/* <td>
                    <input
                      type="checkbox"
                      checked={info.isDue}
                      onChange={() =>
                        handleToggleIsDueDelivered(
                          productType,
                          id,
                          cylinderType,
                          setDeliveredItems
                        )
                      }
                    />
                  </td> */}
              </tr>
            );
        });
      } else {
        // Handle regulators and stoves (no cylinderType)
        const product = details;
        const totalPrice = product.price * product.quantity;
        finalPrice += totalPrice;
        rows.push(
          <tr className={styles.tableBodyRow} key={`${productType}-${id}`}>
            <td className={styles.tableBodyRowItem} data-cell="#: " role="cell">
              {serial++}
            </td>
            <td
              className={styles.tableBodyRowItem}
              data-cell="Brand: "
              role="cell"
            >
              {Name || "Unknown"}
            </td>
            <td
              className={styles.tableBodyRowItem}
              data-cell="Price: "
              role="cell"
            >
              Tk {product.price}
            </td>
            <td
              className={styles.tableBodyRowItem}
              data-cell="Quantity: "
              role="cell"
            >
              {product.quantity}
            </td>
            <td
              className={styles.tableBodyRowItem}
              data-cell="Total: "
              role="cell"
            >
              Tk {totalPrice}
            </td>
            {/* <td>
                <input
                  type="checkbox"
                  checked={product.isDue}
                  onChange={() =>
                    handleToggleIsDueDelivered(
                      productType,
                      id,
                      null,
                      setDeliveredItems
                    )
                  }
                />
              </td> */}
          </tr>
        );
      }
    });
  });

  rows.push(
    <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
      <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
        Total Price
      </td>
      <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
        Tk {finalPrice}
      </td>
    </tr>
  );

  rows.push(
    <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
      <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
        Paid
      </td>
      <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
        Tk{` `}
        <input
          type="number"
          min="-1"
          placeholder="Enter"
          value={paid === -1 ? "" : paid}
          // max={finalPrice}
          onChange={(e) => {
            setPaid(
              Number(e.target.value)
              // Number(e.target.value) > finalPrice
              //   ? finalPrice
              //   : Number(e.target.value)
            );
          }}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          className={styles.tableBodyRowItemInput}
        />
      </td>
    </tr>
  );

  const due = finalPrice - (paid === -1 ? 0 : paid);

  rows.push(
    <tr className={`${styles.tableBodyRow} ${styles.calculation}`} role="row">
      <td className={styles.tableBodyRowItem} role="cell" colSpan="4">
        Due
      </td>
      <td className={styles.tableBodyRowItem} role="cell" colSpan="1">
        Tk {due}
      </td>
    </tr>
  );

  return rows;
}
