import { Outlet } from "react-router-dom";
import { useBrandStore } from "../../stores/brandStore";
import { useEffect } from "react";

export default function ExchangeLayout() {
  const initializeDraft = useBrandStore((state) => state.initializeDraft);

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  return <Outlet />;
}
