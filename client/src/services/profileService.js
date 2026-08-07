import axios from "axios";

const API = "/api/users";

const config = {
  withCredentials: true,
};

export const getProfile = async () => {
  const { data } = await axios.get(`${API}/profile`, config);
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await axios.put(`${API}/profile`, payload, config);
  return data;
};

export const getStats = async () => {
  const { data } = await axios.get(`${API}/stats`, config);
  return data;
};

export const getQuizStats = async () => {
  const { data } = await axios.get(`${API}/quiz`, config);
  return data;
};

export const getInventory = async () => {
  const { data } = await axios.get(`${API}/inventory`, config);
  return data;
};

export const getActivity = async () => {
  const { data } = await axios.get(`${API}/activity`, config);
  return data;
};

export const getDiscoveries = async () => {
  const { data } = await axios.get(`${API}/dashboard`, config);
  return data.discoveries || [];
};

export const getCollection = async () => {
  const { data } = await axios.get(`${API}/collection`, config);
  return data;
};