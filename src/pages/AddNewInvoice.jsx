import { useState, useEffect, useContext } from "react";
import { InvoiceDetails } from "./InvoiceDetails";
import { CustomerProvider } from "../contexts/customers";
import { InvoiceDataProvider } from "../contexts/invoiceData";
import { getCustomerData } from "../api/fetchCustomerData";
import { LineItemsContext } from "../contexts/lineItems";

export const InvoiceForm = ({ setShowInvoiceForm, draftedInvoice }) => {
  const { lineItemsTableData } = useContext(LineItemsContext);

  const [customerData, setCustomerData] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    lineItems: lineItemsTableData,
  });

  useEffect(() => {
    async function getData() {
      const response = await getCustomerData();
      setCustomerData(response.users);
    }
    getData();
  }, []);

  return (
    <div className="invoice-form">
      <CustomerProvider customers={customerData} setCustomers={setCustomerData}>
        <InvoiceDataProvider
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
        >
          <InvoiceDetails
            setShowInvoiceForm={setShowInvoiceForm}
            draftedInvoice={draftedInvoice}
          />
        </InvoiceDataProvider>
      </CustomerProvider>
    </div>
  );
};
