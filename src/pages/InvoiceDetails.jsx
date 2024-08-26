import { useState, useContext, useEffect } from "react";
import { Autocomplete } from "../components/Autocomplete";
import { Input } from "../components/Input";
import { LineItemForm } from "./AddLineItem";
import { UITable } from "../components/Table";
import { UIButton } from "../components/Button";
import Divider from "@mui/material/Divider";
import { LineItemtableHeaderData } from "../constants";
import { LineItemsContext } from "../contexts/lineItems";
import { CustomersContext } from "../contexts/customers";
import { InvoiceDataContext } from "../contexts/invoiceData";
import { useCalculateAmount } from "../hooks/useCalculateAmount";
import { InvoicePreview } from "./InvoicePreview";
import { InvoicesContext } from "../contexts/invoices";

export const InvoiceDetails = ({ draftedInvoice, setShowInvoiceForm }) => {
  const { calculateSubTotal, subTotal, balance, calculateTotalBalance } =
    useCalculateAmount();
  const { lineItemsTableData, setLineItemsTableData } =
    useContext(LineItemsContext);
  const { invoices, setInvoices } = useContext(InvoicesContext);

  const { customers, setCustomers } = useContext(CustomersContext);
  const { invoiceData, setInvoiceData } = useContext(InvoiceDataContext);
  const [openLineModal, setOpenLineModal] = useState(false);
  const [editLineItem, setEditLineItem] = useState(null);
  const [showInvoicePreview, setShowInvoicePreview] = useState(false);

  useEffect(() => {
    const subTotalTemp = calculateSubTotal(invoiceData?.lineItems);
    calculateTotalBalance(
      invoiceData?.tax,
      invoiceData?.discount,
      subTotalTemp
    );
  }, [invoiceData?.lineItems]);

  useEffect(() => {
    if (draftedInvoice) {
      setInvoiceData(draftedInvoice);
    }
  }, [draftedInvoice]);

  const onClickSave = () => {
    let isAlreadyExistingItem = false;

    let newInvoices = invoices.map((item) => {
      if (item.invoiceNumber === invoiceData.invoiceNumber) {
        isAlreadyExistingItem = true;
        item = {
          ...item,
          invoiceNumber: invoiceData.invoiceNumber,
          name: invoiceData.name,
          email: invoiceData.email,
          date: invoiceData.dueDate,
          amount: invoiceData.total,
        };
      }
      return item;
    });

    if (!isAlreadyExistingItem) {
      let invoiceObj = {
        invoiceNumber: invoiceData.invoiceNumber,
        name: invoiceData.name,
        email: invoiceData.email,
        date: invoiceData.dueDate,
        amount: invoiceData.amount,
        status: "Not Sent",
        action: "Edit",
      };
      setInvoices([...invoices, invoiceObj]);
    } else {
      setInvoices(newInvoices);
    }

    const getDrafts = JSON.parse(localStorage.getItem("invoices")) || [];

    let alreadyExistingDraft = false;
    let newDrafts = getDrafts.map((draft) => {
      if (draft.invoiceNumber === invoiceData.invoiceNumber) {
        alreadyExistingDraft = true;
        draft = invoiceData;
      }
      return draft;
    });

    if (!alreadyExistingDraft) {
      newDrafts = [...getDrafts, invoiceData];
    }

    localStorage.setItem("invoices", JSON.stringify(newDrafts));
    setShowInvoiceForm(false);
  };

  const onChangeHandler = (e, name) => {
    setInvoiceData({
      ...invoiceData,
      [name]: e.target.value,
    });
  };

  const onClickAddItem = () => setOpenLineModal(!openLineModal);

  const fetchSuggestions = async () => {
    const response = await getCustomerData();
    return response.users;
  };

  const onSelectCustomer = (item) => {
    setInvoiceData({
      ...invoiceData,
      name: item?.firstName + " " + item?.lastName,
      email: item?.email,
      billingAddress:
        item?.address?.address +
        " " +
        item?.address?.city +
        " " +
        item?.address?.state +
        " " +
        item?.address?.country +
        " " +
        item?.address?.postalCode,
    });
  };

  const setLineItemData = (lineItems) => {
    setInvoiceData({ ...invoiceData, lineItems });
    setLineItemsTableData([...lineItems]);
  };

  const onClickDelete = (item) => {
    const lineItemsTableFilteredData = lineItemsTableData.filter(
      (data) => data.id !== item.id
    );
    setLineItemsTableData(lineItemsTableFilteredData);
    setInvoiceData({ ...invoiceData, lineItems: lineItemsTableFilteredData });
  };

  const onClickEdit = (item) => {
    setEditLineItem(item);
    setOpenLineModal(true);
  };

  const handleOnChangeAmount = (e, name) => {
    const val = Number(e.target.value);
    if (name == "tax") {
      calculateTotalBalance(val, invoiceData?.discount, subTotal);
    } else {
      calculateTotalBalance(invoiceData?.tax, val, subTotal);
    }
    onChangeHandler(e, [name]);
  };

  console.log(invoiceData, "invoiceData");

  return (
    <div className={"invoice-details"}>
      <h4>Invoice</h4>
      <form>
        <div>
          <Autocomplete
            InputLabel={"Customer"}
            fetchSuggestions={fetchSuggestions}
            data={customers}
            onClickItem={onSelectCustomer}
            defaultValue={invoiceData?.name}
          />
          <Input
            InputLabel={"Customer email"}
            type={"text"}
            value={invoiceData?.email}
            onChange={(e) => onChangeHandler(e, "email")}
          />
          <Input
            InputLabel={"Billing Address"}
            type={"text"}
            value={invoiceData?.billingAddress}
            onChange={(e) => onChangeHandler(e, "billingAddress")}
          />
        </div>
        <div>
          <Input
            InputLabel={"Invoice Number"}
            type={"text"}
            onChange={(e) => onChangeHandler(e, "invoiceNumber")}
            value={invoiceData?.invoiceNumber}
          />
          <Input
            InputLabel={"Invoice Date"}
            type={"date"}
            onChange={(e) => onChangeHandler(e, "invoiceDate")}
            value={invoiceData?.invoiceDate}
          />
          <Input
            InputLabel={"Due Date"}
            type={"date"}
            onChange={(e) => onChangeHandler(e, "dueDate")}
            value={invoiceData?.dueDate}
          />
        </div>
      </form>

      <Divider />

      <UIButton title={"Add Item"} onClickCb={onClickAddItem} />
      <LineItemForm
        open={openLineModal}
        setOpen={setOpenLineModal}
        invoiceData={invoiceData}
        setInvoiceData={setLineItemData}
        editLineItem={editLineItem}
        setEditLineItem={setEditLineItem}
      />
      <UITable
        tableHeaderData={LineItemtableHeaderData}
        tableBodyData={lineItemsTableData}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
      <div className="amount-section">
        <div>
          {`SubTotal`}: {`$${subTotal}`}
        </div>
        <br />
        <div>
          Taxes:
          <input
            type={"number"}
            onChange={(e) => handleOnChangeAmount(e, "tax")}
            value={invoiceData?.tax || 0}
          />
        </div>
        <br />
        <div>
          Discount:
          <input
            type={"number"}
            onChange={(e) => handleOnChangeAmount(e, "discount")}
            value={invoiceData?.discount || 0}
          />
        </div>
        <br />
        <div>Total Balance: {`$${balance}`}</div>
      </div>
      <InvoicePreview
        open={showInvoicePreview}
        setOpen={setShowInvoicePreview}
        balance={balance}
      />
      <div className="footer">
        <UIButton title={"Back"} onClickCb={() => setShowInvoiceForm(false)} />
        <div>
          <UIButton title={"Save"} onClickCb={onClickSave} />
          <UIButton
            title={"Save and Send"}
            onClickCb={() => setShowInvoicePreview(true)}
          />
        </div>
      </div>
    </div>
  );
};
