"use client";

import { create } from "zustand";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
  getDeletedEventsService,
} from "../service/event.service";

export const useEventStore = create((set) => ({
  events: [],
  event: null,
  deletedEvents: [],
  pagination: null,
  loading: false,
  error: null,
  success: false,

  reset: () => set({ error: null, success: false }),

  fetchEvents: async (params) => {
    set({ loading: true, error: null });
    try {
      const { events, pagination } = await getAllEventsService(params);
      set({ events: events || [], pagination, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message || "Failed to fetch events",
        loading: false,
      });
    }
  },

  fetchEventById: async (id) => {
    set({ loading: true, error: null });
    try {
      const event = await getEventByIdService(id);
      set({ event, loading: false });
      return event;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch event",
        loading: false,
      });
    }
  },

  createEvent: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const newEvent = await createEventService(data);
      set((state) => ({
        events: [newEvent, ...state.events],
        loading: false,
        success: true,
      }));
      return newEvent;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create event",
        loading: false,
        success: false,
      });
    }
  },

  updateEvent: async (id, data) => {
    set({ loading: true, error: null, success: false });
    try {
      const updated = await updateEventService(id, data);
      set((state) => ({
        events: state.events.map((e) => (e._id === id ? updated : e)),
        event: updated,
        loading: false,
        success: true,
      }));
      return updated;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update event",
        loading: false,
        success: false,
      });
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null, success: false });
    try {
      await deleteEventService(id);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        loading: false,
        success: true,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete event",
        loading: false,
        success: false,
      });
    }
  },

  fetchDeletedEvents: async () => {
    set({ loading: true, error: null });
    try {
      const deletedEvents = await getDeletedEventsService();
      set({ deletedEvents: deletedEvents || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch deleted events",
        loading: false,
      });
    }
  },
}));