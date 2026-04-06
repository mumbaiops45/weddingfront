import axios from "axios";
import apiClient from "../utils/apiClient";

// const apiClient = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

export const createBookingApi = async (data) => {
  const response = await apiClient.post("/booking/create", data);
  return response.data;
};

export const getAllBookingsApi = async (params) => {
  const response = await apiClient.get("/booking/getall", { params });
  return response.data;
};

export const getBookingByIdApi = async (id) => {
  const response = await apiClient.get(`/booking/get/${id}`);
  return response.data;
};

export const updateBookingApi = async (id, data) => {
  const response = await apiClient.put(`/booking/update/${id}`, data);
  return response.data;
};

export const deleteBookingApi = async (id) => {
  const response = await apiClient.delete(`/booking/delete/${id}`);
  return response.data;
};

export const confirmBookingApi = async (id) => {
  const response = await apiClient.put(`/booking/confirm/${id}`);
  return response.data;
};

export const rejectBookingApi = async (id, reason) => {
  const response = await apiClient.put(`/booking/reject/${id}`, { reason });
  return response.data;
};

export const completeBookingApi = async (id) => {
  const response = await apiClient.put(`/booking/complete/${id}`);
  return response.data;
};

export const addVendorToBookingApi = async (id, data) => {
  const response = await apiClient.post(`/booking/${id}/vendor`, data);
  return response.data;
};

export const removeVendorFromBookingApi = async (bookingId, vendorEntryId) => {
  const response = await apiClient.delete(
    `/booking/${bookingId}/vendor/${vendorEntryId}`
  );
  return response.data;
};

export const updatePaymentStatusApi = async (id, paymentStatus) => {
  const response = await apiClient.put(`/booking/payment/${id}`, {
    paymentStatus,
  });
  return response.data;
};


export const getBookingsByOrderApi = async (order = "desc", sortBy = "createdAt") => {
  const response = await apiClient.get("/booking/getall", {
    params: { order, sortBy },
  });
  return response.data;
};


export const bulkUpdateBookingApi = async (id, data) => {
  const response = await apiClient.put(`/booking/update/${id}`, data);
  return response.data;
};