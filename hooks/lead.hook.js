import { useEffect } from "react";
import { useLeadsStore  , fetchsingleLeadsService} from "../store/lead.store";

export const useLeads = () => {
    const {leads, loading, error, fetchLeads} = useLeadsStore();

    useEffect(() => {
        fetchLeads();
    }, []);

    return {leads, loading, error};
}

