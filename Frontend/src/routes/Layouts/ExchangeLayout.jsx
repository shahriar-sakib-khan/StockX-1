import useLocalStorageState from "../../hooks/useLocalStorageState";
import { Outlet } from "react-router-dom";

export default function ExchangeLayout() {
  const [deliveredItems, setDeliveredItems] = useLocalStorageState(
    "deliveredItems",
    []
  );
  const [receivedItems, setReceivedItems] = useLocalStorageState(
    "receivedItems",
    []
  );

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
