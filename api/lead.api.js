
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllLeads = async () => {
  const response = await apiClient.get("/getall");
  return response.data.leads; 
};

export const getleads = async(id) =>{
    const response = await apiClient.get(`/get/${id}`);
    return response.data.data;
}