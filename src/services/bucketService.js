import api from "./api";

export const getBucket = async (userId) => {
  const response = await api.get(`/bucket/${userId}`);
  return response.data;
};

export const addToBucketApi = async (userId, productId, selectedSize, quantity) => {
  const response = await api.post("/bucket/add", {
    userId,
    productId,
    selectedSize,
    quantity,
  });
  return response.data;
};

export const removeFromBucketApi = async (itemId) => {
  const response = await api.delete(`/bucket/${itemId}`);
  return response.data;
};

export const updateQuantityApi = async (itemId, quantity) => {
  const response = await api.put(`/bucket/${itemId}`, { quantity });
  return response.data;
};

export const clearBucketApi = async (userId) => {
  const response = await api.delete(`/bucket/clear/${userId}`);
  return response.data;
};
