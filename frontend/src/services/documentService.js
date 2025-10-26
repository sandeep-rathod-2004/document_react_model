import api from "./api";

export const uploadDocument = async (file, userEmail) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("owner_email", userEmail);

  const res = await api.post("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getDocuments = async (userEmail) => {
  const res = await api.get(`/documents?owner_email=${userEmail}`);
  return res.data;
};
