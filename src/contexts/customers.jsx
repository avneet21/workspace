import { createContext } from "react";

export const CustomersContext = createContext([]);

export const CustomerProvider = ({ children, customers, setCustomers }) => (
  <CustomersContext.Provider
    value={{
      customers,
      setCustomers,
    }}
  >
    {children}
  </CustomersContext.Provider>
);
