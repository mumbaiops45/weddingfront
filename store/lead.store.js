import { create } from "zustand";
import { fetchLeadsService , searchService  , fetchsingleLeadsService , createLeadService } from "../service/lead.service";


export const useSearchStore = create ((set) =>({
    searchResults: [],
    loading: false,
    error: null,
    query: "",

    setQuery: (query) => set({query}),

    searchLeads: async (query) => {
        set({loading: true, error: null});

        try{
            const results = await searchService(query);
            set({searchResults: results, loading: false});
        } catch (error){
            set({
                error: error.message || "Failed to search leads",
                loading: false,
            });
        }
    },
    clearSearch: () => set({searchResults: [], error: null}),
}));

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

export const useCreateLeadStore = create((set) => ({
    loading: false,
    error: null,
    success: false,

    createLead: async (leadData) => {
        set({loading: true, error: null, success: false});

        try {
            const newLead = await createLeadService(leadData);
            set({loading: false, success: true});
            return newLead;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to create lead",
                loading: false,
                success: false,
            });
        }
    },
}))


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


