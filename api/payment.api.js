
import axios from "axios";
import apiClient from "../utils/apiClient";

// const apiClient = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {"Content-Type" : "application/json"},
//     withCredentials: true,
// });


export const createPaymentApi = async (data) =>{
    const response = await apiClient.post("/payment/create", data);
    return response.data;
}

export const getAllPaymentApi = async (params) =>{
    const response = await apiClient.get("/payment/getall" ,{params});
    return response.data;
}

export const getSinglePaymentApi = async (id) => {
    const response = await apiClient.get(`/payment/get/${id}`);
    return response.data;
}

export const updatePaymentApi = async (id , data) => {
    const response = await apiClient.put(`/payment/update/${id}`, data);
    return response.data;
}

export const deletePaymentApi = async (id) =>{
    const response = await apiClient.delete(`/payment/delete/${id}`);
    return response.data;
}

