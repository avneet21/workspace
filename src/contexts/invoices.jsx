import { createContext } from "react";

export const InvoicesContext = createContext([]);

export const InvoicesProvider = ({ children, invoices, setInvoices }) => (
  <InvoicesContext.Provider value={{invoices, setInvoices}}>
    {children}
  </InvoicesContext.Provider>
);
