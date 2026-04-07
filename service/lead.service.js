import { createLead, getAllLeads, searchLead, getleads } from "../api/lead.api";

export const searchService = async (query) => {
    const response = await searchLead(query);
    
    const leadsArray = response.leads || [];
    return leadsArray.map(lead => ({
        ...lead,
         weddingDateFormatted: lead.weddingDate  
          ? new Date(lead.weddingDate).toLocaleDateString()
          : "N/A",
    }));
};

export const fetchLeadsService = async () => {
    const leads = await getAllLeads();

    return leads.map(lead => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));
}


export const createLeadService = async (leadData) => {
    const response = await createLead(leadData);
    return {
        ...response,
        createdAt: new Date().toISOString(),
    };
}

export const fetchsingleLeadsService = async (id) => {
    const leads = await getleads(id);
    return leads.map(lead => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));

}

export const addFollowUpService = async (leadId, followUpData) => {
    const response = await addFollowUp(leadId, followUpData);
    return response;
}




