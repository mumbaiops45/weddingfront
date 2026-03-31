import { getAllLeads , getleads } from "../api/lead.api";

export const fetchLeadsService = async() => {
    const leads = await getAllLeads();

    return leads.map(lead  => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));
}



export const fetchsingleLeadsService = async() =>{
    const leads = await getleads();
return leads.map(lead  => ({
        ...lead,
        weddingDateFormatted: new Date(lead.weddingDate).toLocaleDateString(),
    }));

}