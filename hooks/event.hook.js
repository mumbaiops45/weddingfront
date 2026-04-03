"use client";

import { useEffect } from "react";
import { useEventStore } from "../store/event.store";

export const useEvents = (params) => {
  const { events, pagination, loading, error, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents(params);
  }, []);

  return { events: events || [], pagination, loading, error };
};

export const useEvent = (id) => {
  const { event, loading, error, fetchEventById } = useEventStore();

  useEffect(() => {
    if (id) fetchEventById(id);
  }, [id]);

  return { event, loading, error };
};

export const useCreateEvent = () => {
  const { createEvent, loading, error, success, reset } = useEventStore();
  return { createEvent, loading, error, success, reset };
};

export const useUpdateEvent = () => {
  const { updateEvent, loading, error, success, reset } = useEventStore();
  return { updateEvent, loading, error, success, reset };
};

export const useEventActions = () => {
  const { deleteEvent, loading, error, success, reset } = useEventStore();
  return { deleteEvent, loading, error, success, reset };
};

export const useDeletedEvents = () => {
  const { deletedEvents, loading, error, fetchDeletedEvents } = useEventStore();

  useEffect(() => {
    fetchDeletedEvents();
  }, []);

  return { deletedEvents: deletedEvents || [], loading, error };
};