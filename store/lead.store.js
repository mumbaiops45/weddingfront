import { create } from "zustand";
import { fetchLeadsService  , fetchsingleLeadsService} from "../service/lead.service";

export const useLeadsStore = create((set) => ({
    leads: [],
    loading: false,
    error: null,

    fetchLeads: async () => {
        set({loading: true, error: null});

        try {
            const leads = await fetchLeadsService();
            set({leads, loading: false});
        } catch (error) {
            set({error: "Failed to fetch leads", loading: false});
        }
    },

     addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
}));


export const usesingleLeadsStore = create((set) => ({
    leads: [],
    loading: false,
    error: null,

    fetchLeads: async () => {
        set({loading: true, error: null});

        try {
            const leads = await fetchsingleLeadsService();
            set({leads, loading: false});
        } catch (error) {
            set({error: "Failed to fetch leads", loading: false});
        }
    },

     addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
}));