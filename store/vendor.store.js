import { create } from "zustand";
import { createVendorService , getAllVendorService , getSingleVendorService , updateVendorService, deleteVendorService } from "../service/vendor.service";

export const useVendorStore = create ((set) =>({
    vendors: [],
    vendor: null,
    loading: false,
    error: null,
    success: false,

    reset: () => set({error: null, success: false}),

    fetchVendors: async (params) => {
        set({loading: true, error: null});

        try {
            const data = await getAllVendorService(params);
            set({vendors: data || [], loading : false});
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false});
        }
    },

    fetchVendor: async (id) =>{
        set({loading: true ,  error: null});
        try {
            const data = await getSingleVendorService(id);
            set({vendor: data, loading: false});
            return data;
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false});
        }
    },
    
    createVendor: async (data) => {
        set({loading: true, error: null, success: false});
        try {
            const newVendor = await createVendorService(data);
            set((state) => ({
                vendors: [newVendor, ...state.vendors],
                loading: false,
                success: true,
            }));

            return newVendor;
        } catch (error) {
            set({
                error: error.response?.data?.message || 
                " Failed to create vendor",
                loading: false,
                success: false,
            });
        }
    },

    updateVendor: async (id, data) => {
        set({loading: true , error: null, success: false});
        try {
            const updated = await updateVendorService(id, data);
            set((state) => ({
                vendors: state.vendors.map((v) => (v._id === id ? updated : v)),
                vendor: updated,
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

    deleteVendor: async (id) => {
        set({loading: true , error: null , success: false});
        try {
            await deleteVendorService(id);
            set((state) => ({
                vendors: state.vendors.filter((v) => v._id !== id),
                loading: false,
                success: true,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to delete vendor",
                loading: false,
                success: false,
            });
        }
    },
    
}))