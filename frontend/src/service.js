import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
});

export const addItem = (data) =>
  api.post("/item/add-item", data).then(handleResponse);

export const getItems = () =>
  api.get("/item/get-all-items").then(handleResponse);

export const addBill = (data) =>
  api.post("/bill/add-bill", data).then(handleResponse);

export const getMyBills = () =>
  api.get("/bill/get-my-bills").then(handleResponse);

export const getSalesStats = () =>
  api.get("/bill/get-sales-stats").then(handleResponse);

const handleResponse = (res) => res.data;
