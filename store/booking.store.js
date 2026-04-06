"use client";

import { create } from "zustand";
import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  deleteBookingService,
  confirmBookingService,
  rejectBookingService,
  completeBookingService,
  addVendorToBookingService,
  removeVendorFromBookingService,
  updatePaymentStatusService,
  getBookingsByOrderService,   
  bulkUpdateBookingService,    
} from "../service/booking.service";

export const useBookingStore = create((set) => ({
  bookings: [],
  booking: null,
  pagination: null,
  loading: false,
  error: null,
  success: false,


  sortBy: "createdAt",
  order: "desc",

  reset: () => set({ error: null, success: false }),

  
  setOrder: (order, sortBy = "createdAt") => {
    set({ order, sortBy });
  },

  fetchBookings: async (params) => {
    set({ loading: true, error: null });
    try {
      const { bookings, pagination } = await getAllBookingsService(params);
      set({ bookings, pagination, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch bookings",
        loading: false,
      });
    }
  },

  
  fetchBookingsByOrder: async (order, sortBy) => {
    set({ loading: true, error: null, order, sortBy });
    try {
      const { bookings, pagination } = await getBookingsByOrderService(order, sortBy);
      set({ bookings, pagination, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch bookings",
        loading: false,
      });
    }
  },

  fetchBookingById: async (id) => {
    set({ loading: true, error: null });
    try {
      const booking = await getBookingByIdService(id);
      set({ booking, loading: false });
      return booking;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch booking",
        loading: false,
      });
    }
  },

  createBooking: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const newBooking = await createBookingService(data);
      set((state) => ({
        bookings: [newBooking, ...state.bookings],
        loading: false,
        success: true,
      }));
      return newBooking;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create booking",
        loading: false,
        success: false,
      });
    }
  },

  updateBooking: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await updateBookingService(id, data);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update booking",
        loading: false,
        success: false,
      });
    }
  },

 
  bulkUpdateBooking: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await bulkUpdateBookingService(id, data);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update booking",
        loading: false,
        success: false,
      });
    }
  },

  deleteBooking: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      await deleteBookingService(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b._id !== id),
        loading: false,
        success: true,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete booking",
        loading: false,
        success: false,
      });
    }
  },

  confirmBooking: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await confirmBookingService(id);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to confirm booking",
        loading: false,
        success: false,
      });
    }
  },

  rejectBooking: async (id, reason) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await rejectBookingService(id, reason);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to reject booking",
        loading: false,
        success: false,
      });
    }
  },

  completeBooking: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await completeBookingService(id);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to complete booking",
        loading: false,
        success: false,
      });
    }
  },

  addVendorToBooking: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await addVendorToBookingService(id, data);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add vendor",
        loading: false,
        success: false,
      });
    }
  },

  removeVendorFromBooking: async (bookingId, vendorEntryId) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await removeVendorFromBookingService(bookingId, vendorEntryId);
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b._id === bookingId ? updated : b
        ),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to remove vendor",
        loading: false,
        success: false,
      });
    }
  },

  updatePaymentStatus: async (id, paymentStatus) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await updatePaymentStatusService(id, paymentStatus);
      set((state) => ({
        bookings: state.bookings.map((b) => (b._id === id ? updated : b)),
        booking: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update payment",
        loading: false,
        success: false,
      });
    }
  },
}));