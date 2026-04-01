"use client"
import { useEffect } from "react";
import { useLeadsStore, useCreateLeadStore } from "../store/lead.store"; 

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