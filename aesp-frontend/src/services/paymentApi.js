// src/services/paymentApi.js
import axios from "axios";

const API_BASE = "http://localhost:5050";

export const getPaymentsByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/payments/user/${userId}`);
  return res.data;
};

export const createPayment = async ({
  userId,
  packageName,
  amount,
  currency,
  method,
}) => {
  const res = await axios.post(`${API_BASE}/api/payments`, {
    userId,
    packageName,
    amount,
    currency,
    method,
  });
  return res.data;
};
