import api from "./api";

export const loginUser = async (email, password) => {
  const response = await api.post("/user/login", { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const updateUser = async (id, username, email, password) => {
  const response = await api.put(`/user/${id}`, { username, email, password });
  return response.data;
};

export const updatePhotoProfile = async (id, file) => {
  const formData = new FormData();
  formData.append("photo", file);
  const response = await api.put(`/user/${id}/photo`, formData);
  return response.data;
};
