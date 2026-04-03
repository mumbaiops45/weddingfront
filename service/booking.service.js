import {
  createBookingApi,
  getAllBookingsApi,
  getBookingByIdApi,
  updateBookingApi,
  deleteBookingApi,
  confirmBookingApi,
  rejectBookingApi,
  completeBookingApi,
  addVendorToBookingApi,
  removeVendorFromBookingApi,
  updatePaymentStatusApi,
  getBookingsByOrderApi,  
  bulkUpdateBookingApi,   
} from "../api/booking.api";

export const createBookingService = async (data) => {
  const res = await createBookingApi(data);
  return res.data;
};

export const getAllBookingsService = async (params) => {
  const res = await getAllBookingsApi(params);
  return { bookings: res.bookings, pagination: res.pagination };
};

export const getBookingByIdService = async (id) => {
  const res = await getBookingByIdApi(id);
  return res.data;
};

export const updateBookingService = async (id, data) => {
  const res = await updateBookingApi(id, data);
  return res.data;
};

export const deleteBookingService = async (id) => {
  const res = await deleteBookingApi(id);
  return res;
};

export const confirmBookingService = async (id) => {
  const res = await confirmBookingApi(id);
  return res.data;
};

export const rejectBookingService = async (id, reason) => {
  const res = await rejectBookingApi(id, reason);
  return res.data;
};

export const completeBookingService = async (id) => {
  const res = await completeBookingApi(id);
  return res.data;
};

export const addVendorToBookingService = async (id, data) => {
  const res = await addVendorToBookingApi(id, data);
  return res.data;
};

export const removeVendorFromBookingService = async (bookingId, vendorEntryId) => {
  const res = await removeVendorFromBookingApi(bookingId, vendorEntryId);
  return res.data;
};

export const updatePaymentStatusService = async (id, paymentStatus) => {
  const res = await updatePaymentStatusApi(id, paymentStatus);
  return res.data;
};


export const getBookingsByOrderService = async (order, sortBy) => {
  const res = await getBookingsByOrderApi(order, sortBy);
  return { bookings: res.bookings, pagination: res.pagination };
};


export const bulkUpdateBookingService = async (id, data) => {
  const res = await bulkUpdateBookingApi(id, data);
  return res.data;
};