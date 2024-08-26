import { createContext } from "react";

export const InvoiceDataContext = createContext({});

export const InvoiceDataProvider = ({
  children,
  invoiceData,
  setInvoiceData,
}) => (
  <InvoiceDataContext.Provider
    value={{
      invoiceData,
      setInvoiceData,
    }}
  >
    {children}
  </InvoiceDataContext.Provider>
);
