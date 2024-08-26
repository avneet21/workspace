import { useState } from "react";

export const useCalculateAmount = () => {
  const [balance, setBalance] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  function calculateTotalBalance(taxes = 0, discount = 0, total = 0) {
    console.log(taxes, discount, total, "calculateTotalBalance");
    let newTotal = Number(total) + Number(taxes) - Number(discount);
    setBalance(newTotal);
    return newTotal;
  }

  function calculateSubTotal(lineItems) {
    let currentAmount = 0;
    lineItems?.map((lineItem) => {
      currentAmount = currentAmount + lineItem.total;
    });
    setSubTotal(currentAmount);
    return currentAmount;
  }

  return {
    balance: balance,
    calculateTotalBalance: calculateTotalBalance,
    subTotal: subTotal,
    calculateSubTotal: calculateSubTotal,
  };
};
