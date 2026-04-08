"use client";

import React, { useState } from "react";
import { useEvents, useEventActions } from "../../../hooks/event.hook";
import CreateEvent from "../components/CreateEvent";
import EditEvent from "../components/EditEvent";
import useToast from "../../../hooks/useToast";

const EventList = () => {
  const { events, pagination, loading, error, } = useEvents();
  const { deleteEvent } = useEventActions();
  const{showSuccess , showError}  = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const handleDelete = async (id) => {
     if (!confirm("Are you sure you want to delete this event?")) {
    showError("Delete cancelled"); 
    return;
  }
    setActionLoading(id);
    try {
      const res = await deleteEvent(id);

      if(res) {
        showSuccess("Event deleted Successfully");
      } else {
        showSuccess("Event deleted Successfully");
      }
    } catch (error) {
      showError("Something went wrong while deleting");
    } finally {
      setActionLoading(null);
    }
    
  };

  if (loading) return (
    <div className="p-6 text-center text-gray-500">Loading events...</div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">


      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Events</h2>
        <button
          onClick={() => { setShowCreate(!showCreate); setEditingEvent(null); }}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
        >
          {showCreate ? "Cancel" : "+ Create Event"}
        </button>
      </div>


      {showCreate && (
        <div className="mb-6">
          <CreateEvent
            onSuccess={() => {
              setShowCreate(false);
            }}
          />
        </div>
      )}


      {editingEvent && (
        <div className="mb-6">
          <EditEvent
            event={editingEvent}
            onSuccess={() => setEditingEvent(null)}
            onCancel={() => setEditingEvent(null)}
          />
        </div>
      )}


      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}


      {!events || events.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-200">
          No events found
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-100 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.eventType}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    📍 {event.venue}
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {event.eventType}
                </span>
              </div>


              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Event Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(event.eventDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Start Time</p>
                  <p className="font-medium text-gray-800">{event.startTime}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">End Time</p>
                  <p className="font-medium text-gray-800">{event.endTime}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Booking Status</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${event.booking?.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : event.booking?.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {event.booking?.status || "N/A"}
                  </span>
                </div>
              </div>


              {event.notes?.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Notes</p>
                  <div className="flex flex-wrap gap-2">
                    {event.notes.map((note, i) => (
                      <span
                        key={i}
                        className="bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}


              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingEvent(event);
                    setShowCreate(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  disabled={actionLoading === event._id}
                  className="px-4 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 disabled:opacity-50"
                >
                  {actionLoading === event._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {pagination && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
          <p>Total: {pagination.total} events</p>
          <p>Page {pagination.page} of {pagination.totalPages}</p>
        </div>
      )}
    </div>
  );
};

export default EventList;