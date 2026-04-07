import apiClient from "../utils/apiClient";



export const createEventApi = async (data) => {
  const response = await apiClient.post("/events/create", data);
  return response.data;
};

export const getAllEventsApi = async (params) => {
  const response = await apiClient.get("/events/getall", { params });
  return response.data;
};

export const getEventByIdApi = async (id) => {
  const response = await apiClient.get(`/events/get/${id}`);
  return response.data;
};

export const updateEventApi = async (id, data) => {
  const response = await apiClient.put(`/events/update/${id}`, data);
  return response.data;
};

export const deleteEventApi = async (id) => {
  const response = await apiClient.delete(`/events/delete/${id}`);
  return response.data;
};

export const getDeletedEventsApi = async () => {
  const response = await apiClient.get("/events/deleted");
  return response.data;
};