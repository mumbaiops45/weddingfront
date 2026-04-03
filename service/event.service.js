import {
  createEventApi,
  getAllEventsApi,
  getEventByIdApi,
  updateEventApi,
  deleteEventApi,
  getDeletedEventsApi,
} from "../api/event.api";

export const createEventService = async (data) => {
  const res = await createEventApi(data);
  return res.data;
};

export const getAllEventsService = async (params) => {
  const res = await getAllEventsApi(params);
  return {
    events: res.events || [],
    pagination: res.pagination || null,
  };
};

export const getEventByIdService = async (id) => {
  const res = await getEventByIdApi(id);
  return res.data;
};

export const updateEventService = async (id, data) => {
  const res = await updateEventApi(id, data);
  return res.data;
};

export const deleteEventService = async (id) => {
  const res = await deleteEventApi(id);
  return res;
};

export const getDeletedEventsService = async () => {
  const res = await getDeletedEventsApi();
  return res.data || [];
};