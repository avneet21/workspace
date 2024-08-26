import { createContext } from "react";

export const LineItemsContext = createContext([]);

export const LineItemsProvider = ({
  children,
  lineItemsTableData,
  setLineItemsTableData,
}) => (
  <LineItemsContext.Provider
    value={{ lineItemsTableData, setLineItemsTableData }}
  >
    {children}
  </LineItemsContext.Provider>
);
