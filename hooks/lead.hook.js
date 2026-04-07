"use client"
import { useEffect } from "react";
import { useLeadsStore, useCreateLeadStore  , useSearchStore} from "../store/lead.store"; 
import { searchService } from "../service/lead.service";


export const useSearchLeads = () => {
  const {
    searchResults,
    loading,
    error,
    query,
    setQuery,
    searchLeads,
    clearSearch
  } = useSearchStore();

  useEffect(() => {
    if(!query){
      clearSearch();
      return;
    }

    const debounceTimeout = setTimeout(() => {
      searchLeads(query);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query, searchLeads, clearSearch]);

  const updateQuery = (newQuery) => {
    setQuery(newQuery);
  };

  return {searchResults, loading, error, query, updateQuery, clearSearch};
}

export const useLeads = () => {
  const { leads, loading, error, fetchLeads } = useLeadsStore();

  useEffect(() => {
    fetchLeads();
  }, []);

  return { leads, loading, error };
};

export const useCreateLead = () => {
  const { createLead, loading, error, success } = useCreateLeadStore(); 

  const addLead = async (leadData) => {
    const newLead = await createLead(leadData);
    return newLead;
  };

  return { addLead, loading, error, success };
};