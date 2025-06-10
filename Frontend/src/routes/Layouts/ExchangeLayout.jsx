import useLocalStorageState from "../../hooks/useLocalStorageState";
import { Outlet } from "react-router-dom";
import { useBrandStore } from "../../stores/brandStore";
import { useEffect } from "react";

export default function ExchangeLayout() {
  const [deliveredItems, setDeliveredItems] = useLocalStorageState(
    "deliveredItems",
    []
  );
  const [receivedItems, setReceivedItems] = useLocalStorageState(
    "receivedItems",
    []
  );

  const initializeDraft = useBrandStore((state) => state.initializeDraft);

  // On mount, initialize draft selection with current confirmed selection
  useEffect(() => {
    initializeDraft();
  }, [initializeDraft]);

  return (
    <Outlet
      context={{
        deliveredItems,
        setDeliveredItems,
        receivedItems,
        setReceivedItems,
      }}
    />
  );
}
