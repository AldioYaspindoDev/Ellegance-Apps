import api from "./api";

export const getUserOrders = async (email) => {
  const response = await api.get(`/order/user/${email}`);
  return response.data;
};
