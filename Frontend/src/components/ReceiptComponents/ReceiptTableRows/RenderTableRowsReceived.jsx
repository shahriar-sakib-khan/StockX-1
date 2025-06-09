export default function RenderTableRowsReceived() {
  let serial = 1;
  const rows = [];

  // Iterate over each brand in receivedItems
  Object.keys(receivedItems).forEach((id) => {
    const details = receivedItems[id];
    const Name = details.brandName;

    // Iterate over each cylinderType for the current brand
    Object.keys(details).forEach((cylinderType) => {
      const info = details[cylinderType];

      // Push the row into the rows array
      if (cylinderType !== "brandName")
        rows.push(
          <tr
            className={styles.tableBodyRow}
            key={`cylinder-${id}-${cylinderType}`}
          >
            <td className={styles.tableBodyRowItem} data-cell="#: " role="cell">
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
              data-cell="Quantity: "
              role="cell"
            >
              {info.quantity}
            </td>
            {/* <td>
                <input
                  type="checkbox"
                  checked={info.isDue}
                  onChange={() =>
                    handleToggleIsDueReceived(
                      id,
                      cylinderType,
                      setReceivedItems
                    )
                  }
                />
              </td> */}
          </tr>
        );
    });
  });

  return rows;
}
