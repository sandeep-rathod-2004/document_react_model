import api from "./api";

export const registerUser = async (username, email, password) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.data.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }
  return res.data;
};
