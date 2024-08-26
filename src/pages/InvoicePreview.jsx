import { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { InvoiceDataContext } from "../contexts/invoiceData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const InvoicePreview = ({ open, setOpen, balance }) => {
  const { invoiceData } = useContext(InvoiceDataContext);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div class="page-container">
          Page
          <span class="page"></span>
          of
          <span class="pages"></span>
        </div>

        <div class="logo-container">
          <h3>Invoicer</h3>
        </div>
        <table class="invoice-info-container">
          <tr>
            <td rowspan="2" class="client-name">
              Customer Name
            </td>
            <td>{invoiceData.name}</td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td>
              Invoice Date: <strong>{invoiceData.invoiceDate}</strong>
            </td>
            <td>{invoiceData.billingAddress}</td>
          </tr>
          <tr>
            <td>
              Invoice No: <strong>{invoiceData.invoiceNumber}</strong>
            </td>
            <td>{invoiceData.email}</td>
          </tr>
        </table>

        <table class="line-items-container">
          <thead>
            <tr>
              <th class="heading-quantity">Id</th>
              <th class="heading-description">Product/Service</th>
              <th class="heading-quantity">Quantity</th>
              <th class="heading-price">Price</th>
              <th class="heading-subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData?.lineItems.map((lineItem, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{lineItem.name}</td>
                  <td>{lineItem.quantity}</td>
                  <td class="right">${lineItem?.rate}</td>
                  <td class="bold">${lineItem?.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <table class="line-items-container has-bottom-border">
          <thead>
            <tr>
              <th>Payment Info</th>
              <th>Due By</th>
              <th>Total Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="payment-info">
                <div>
                  Account No: <strong>123567744</strong>
                </div>
                <div>
                  Routing No: <strong>120000547</strong>
                </div>
              </td>
              <td class="large">{invoiceData?.dueDate}</td>
              <td class="large ">${balance}</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div class="footer-info">
            <span>hello@useanvil.com</span> |<span>555 444 6666</span> |
            <span>useanvil.com</span>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
