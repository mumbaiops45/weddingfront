import {createLead, getAllLeads , getleads } from "../api/lead.api";

export const fetchLeadsService = async() => {
    const leads = await getAllLeads();

    return leads.map(lead  => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));
}


export const createLeadService = async(leadData) => {
    const response = await createLead(leadData);
    return {
        ...response,
        createdAt: new Date().toISOString(),
    };
}

export const fetchsingleLeadsService = async(id) =>{
    const leads = await getleads(id);
return leads.map(lead  => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));

}

export const addFollowUpService = async(leadId , followUpData) => {
    const response = await addFollowUp(leadId, followUpData);
    return response;
}




