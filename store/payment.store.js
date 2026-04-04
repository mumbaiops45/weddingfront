
import { create } from "zustand";
import { createPaymentService , getAllPaymentService , getSinglePaymentService , updatePaymentService, deletePaymentService } from "../service/payment.service";


export const usePaymentStore = create((set) => ({
  payments: [],
  payment: null,
  loading: false,
  error: null,
  success: false,

  reset: () => set({ error: null, success: false }),

  fetchPayments: async (params) => {
    set({ loading: true, error: null });
    try {
      const { payments } = await getAllPaymentService(params);
      set({ payments: payments || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  fetchPayment: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getSinglePaymentService(id);
      set({ payment: data, loading: false });
      return data;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createPayment: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const newPayment = await createPaymentService(data);
      set((state) => ({
        payments: [newPayment, ...state.payments],
        loading: false,
        success: true,
      }));
      return newPayment;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false, success: false });
    }
  },

  updatePayment: async (id, data) => {
    set({ loading: true, error: null, success: false }); 
    try {
      const updatedPayment = await updatePaymentService(id, data);
      set((state) => ({
        payments: state.payments.map((p) =>
          p._id === id ? updatedPayment : p  
        ),
        payment: updatedPayment,
        loading: false,
        success: true,
      }));
      return updatedPayment;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false, success: false });
    }
  },

  deletePayment: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      await deletePaymentService(id);
      set((state) => ({
        payments: state.payments.filter((p) => p._id !== id), 
        loading: false,
        success: true,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false, success: false });
    }
  },
}));