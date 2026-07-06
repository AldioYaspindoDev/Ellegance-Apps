import api from "./api";

export const loginUser = async (email, password) => {
  const response = await api.post("/user/login", { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/user/me");
  return response.data;
};
