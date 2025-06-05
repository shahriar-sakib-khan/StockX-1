Array.from({ length: 21 }, (_, i) => {
    const id = i + 4;
    return {
      id,
      name: `Brand ${String.fromCharCode(64 + id)}`,
      productType: "cylinder",
      totalCylinderCount: 0,
      price: 1450,
      logo: `brand${id}`,
      cylinders: [
        { id: `${id}-20mm-5`, type: "20mm", size: "5kg", stock: 0, price: 1450 },
        { id: `${id}-20mm-10`, type: "20mm", size: "10kg", stock: 0, price: 1450 },
        { id: `${id}-20mm-15`, type: "20mm", size: "15kg", stock: 0, price: 1450 },
        { id: `${id}-22mm-5`, type: "22mm", size: "5kg", stock: 0, price: 1450 },
        { id: `${id}-22mm-10`, type: "22mm", size: "10kg", stock: 0, price: 1450 },
        { id: `${id}-22mm-15`, type: "22mm", size: "15kg", stock: 0, price: 1450 },
      ]
    }
  })