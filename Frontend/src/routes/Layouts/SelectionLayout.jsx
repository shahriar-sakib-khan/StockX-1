import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const SelectionLayout = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  return (
    <div>
      {/* Provide context to nested routes */}
      <Outlet context={{ selectedBrands, setSelectedBrands }} />
    </div>
  );
};

export default SelectionLayout;
