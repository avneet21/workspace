import { useState, useContext } from "react";
import Container from "@mui/material/Container";
import { UIButton } from "../components/Button";
import { InvoiceForm } from "../pages/AddNewInvoice";
import { UITable } from "../components/Table";
import { InvoiceIableHeaderData, LineItemTableBody } from "../constants";
import { InvoicesContext } from "../contexts/invoices";
import { LineItemsProvider } from "../contexts/lineItems";

export const Dashboard = () => {
  const { invoices } = useContext(InvoicesContext);

  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [lineItemsTableData, setLineItemsTableData] =
    useState(LineItemTableBody);
  const [draftedInvoice, setDraftedInvoice] = useState(null);

  const onClickAction = (row) => {
    const getInvoices = localStorage.getItem("invoices");
    const draftedItem = JSON.parse(getInvoices)?.filter(
      (item) => item.id === row.id
    )?.[0];
    setShowInvoiceForm(true);
    setDraftedInvoice(draftedItem);
  };

  console.log(invoices, "invoices");

  return (
    <Container className="dashboard" maxWidth={false}>
      {!showInvoiceForm ? (
        <div className="overview">
          <h3>Overview</h3>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <UIButton
              title={"Add"}
              onClickCb={() => setShowInvoiceForm(true)}
            />
          </div>
          <UITable
            tableHeaderData={InvoiceIableHeaderData}
            tableBodyData={invoices}
            onClickAction={onClickAction}
          />
        </div>
      ) : (
        <LineItemsProvider
          lineItemsTableData={lineItemsTableData}
          setLineItemsTableData={setLineItemsTableData}
        >
          <InvoiceForm
            setShowInvoiceForm={setShowInvoiceForm}
            draftedInvoice={draftedInvoice}
          />
        </LineItemsProvider>
      )}
    </Container>
  );
};
