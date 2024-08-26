export const getCustomerData = async () => {
  const response = await fetch("https://dummyjson.com/users");
  return response.json();
};
