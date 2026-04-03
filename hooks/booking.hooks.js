
"use client";

import { useEffect } from "react";
import { useBookingStore } from "../store/booking.store";

export const useBookings = (params) => {
  const { bookings, pagination, loading, error, fetchBookings } =
    useBookingStore();

  useEffect(() => {
    fetchBookings(params);
  }, []);

  return { bookings, pagination, loading, error };
};


export const useBooking = (id) => {
  const { booking, loading, error, fetchBookingById } = useBookingStore();

  useEffect(() => {
    if (id) fetchBookingById(id);
  }, [id]);

  return { booking, loading, error };
};


export const useCreateBooking = () => {
  const { createBooking, loading, error, success, reset } = useBookingStore();
  return { createBooking, loading, error, success, reset };
};


export const useUpdateBooking = () => {
  const { updateBooking, bulkUpdateBooking, loading, error, success, reset } =
    useBookingStore();
  return { updateBooking, bulkUpdateBooking, loading, error, success, reset };
};


export const useBookingOrder = () => {
  const {
    bookings,
    pagination,
    loading,
    error,
    order,
    sortBy,
    fetchBookingsByOrder,
    setOrder,
  } = useBookingStore();

  const changeOrder = (newOrder, newSortBy = "createdAt") => {
    setOrder(newOrder, newSortBy);
    fetchBookingsByOrder(newOrder, newSortBy);
  };

  return { bookings, pagination, loading, error, order, sortBy, changeOrder };
};


export const useBookingActions = () => {
  const {
    updateBooking,
    bulkUpdateBooking,
    deleteBooking,
    confirmBooking,
    rejectBooking,
    completeBooking,
    updatePaymentStatus,
    addVendorToBooking,
    removeVendorFromBooking,
    loading,
    error,
    success,
    reset,
  } = useBookingStore();

  return {
    updateBooking,
    bulkUpdateBooking,
    deleteBooking,
    confirmBooking,
    rejectBooking,
    completeBooking,
    updatePaymentStatus,
    addVendorToBooking,
    removeVendorFromBooking,
    loading,
    error,
    success,
    reset,
  };
};


