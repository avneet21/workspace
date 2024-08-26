import { useState, useEffect } from "react";
import { UIButton } from "../components/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Input } from "../components/Input";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LineItemForm = ({
  open,
  setOpen,
  invoiceData,
  setInvoiceData,
  editLineItem,
  setEditLineItem,
}) => {
  const [lineItem, setLineItem] = useState({});

  useEffect(() => {
    setLineItem(editLineItem);
  }, [editLineItem]);

  const handleClose = () => {
    setOpen(false);
    setLineItem({});
    setEditLineItem(null);
  };

  const onChangeHandler = (e, name) => {
    setLineItem({
      ...lineItem,
      [name]: e.target.value,
    });
  };

  const handleOnClickAdd = () => {
    let lineItems = [];
    const previousLineItems = invoiceData?.lineItems;
    let lineItemObj = {
      ...lineItem,
      total: lineItem.rate * lineItem.quantity,
      edit: "edit",
      delete: "delete",
    };
    console.log(previousLineItems, "previousLineItems");
    if (!editLineItem) {
      if (previousLineItems) {
        lineItems = [
          ...previousLineItems,
          {
            id: `${previousLineItems.length + 1}`,
            ...lineItemObj,
          },
        ];
      } else {
        lineItems = [
          {
            id: "2",
            ...lineItemObj,
          },
        ];
      }
    } else {
      lineItems = previousLineItems.map((item) => {
        if (lineItem.id == item.id) {
          item = lineItem;
        }
        return item;
      });
    }
    setInvoiceData(lineItems);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Input
          InputLabel={"Product/Service"}
          type={"text"}
          onChange={(e) => onChangeHandler(e, "name")}
          value={lineItem?.name}
        />
        <Input
          InputLabel={"Description"}
          type={"text"}
          onChange={(e) => onChangeHandler(e, "description")}
          value={lineItem?.description}
        />
        <Input
          InputLabel={"Quantity"}
          type={"number"}
          onChange={(e) => onChangeHandler(e, "quantity")}
          value={lineItem?.quantity}
        />
        <Input
          InputLabel={"Rate"}
          type={"text"}
          onChange={(e) => onChangeHandler(e, "rate")}
          value={`${lineItem?.rate}`}
        />
        <UIButton
          title={editLineItem ? "Update" : "Add"}
          onClickCb={handleOnClickAdd}
        />
      </Box>
    </Modal>
  );
};
