import axios from "axios";
import apiClient from "../utils/apiClient";


// const apiClient = axios.create({
//     baseURL : "http://localhost:8080",
//     headers: {"Content-Type" : "application/json"},
//     withCredentials: true,
// });


export const createVendorApi = async(data) =>{
    const respose = await apiClient.post("/vendor/create", data);
    return respose.data;
}

export const getAllVendorApi = async (params) =>{
    const response = await apiClient.get("/vendor/getall" , {params});
    return response.data;
}

export const getSingleVendorApi = async (id) => {
    const response = await apiClient.get(`/vendor/get/${id}`);
    return response.data;
}

export const updateVendorApi = async (id , data) =>{
  const response = await apiClient.put(`/vendor/update/${id}` , data);
  return response.data;
}

export const deleteVendorApi = async (id) => {
    const response = await apiClient.delete(`/vendor/delete/${id}`);
    return response.data;
}