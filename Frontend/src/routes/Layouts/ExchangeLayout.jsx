import { Outlet } from "react-router-dom";
import { useBrandStore } from "../../stores/brandStore";
import { useEffect } from "react";
import { useAccessoryStore } from "../../stores/AccessoryStore";

export default function ExchangeLayout() {
  const initializeDraft = useBrandStore((state) => state.initializeDraft);
  const initializeDraftAccessories = useAccessoryStore(
    (state) => state.initializeDraftAccessories
  );

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
    initializeDraftAccessories();
  }, [initializeDraft, initializeDraftAccessories]);

  return <Outlet />;
}
