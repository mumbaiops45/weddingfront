"use client";

import React, { useState } from "react";
import { useCreateEvent } from "../../../hooks/event.hook";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useBookings } from '../../../hooks/booking.hooks';


const CreateEvent = ({ onSuccess }) => {
    const { createEvent, loading, error, success, reset } = useCreateEvent();
    const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings();
    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState({
        booking: "",
        eventType: "Wedding",
        eventDate: "",
        startTime: "",
        endTime: "",
        venue: "",
        notes: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            booking: formData.booking,
            eventType: formData.eventType,
            eventDate: formData.eventDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            venue: formData.venue,
            notes: formData.notes ? [formData.notes] : [],
        };

        const result = await createEvent(data);

        if (result) {
            setFormData({
                booking: "",
                eventType: "Wedding",
                eventDate: "",
                startTime: "",
                endTime: "",
                venue: "",
                notes: "",
            });
            reset();
            if (onSuccess) onSuccess();
        }
    };

    return (
        <>
            <div>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
                >
                    Open dialog
                </button>
                <Dialog open={open} onClose={setOpen} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                                Create New Event
                                            </h3>

                                            {error && (
                                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                                    {error}
                                                </div>
                                            )}

                                            {success && (
                                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                                                    ✅ Event created successfully!
                                                </div>
                                            )}

                                            <p onClick={() => setOpen(false)}>X</p>

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Booking ID <span className="text-red-500">*</span>
                                                        </label>
                                                        <select
                                                            name="booking"
                                                            value={formData.booking}
                                                            onChange={(e) => setFormData({ ...formData, booking: e.target.value })}
                                                            required
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                                                        >
                                                            <option value="">
                                                                {bookingsLoading ? "Loading bookings..." : "Select Booking"}
                                                            </option>

                                                            {(bookings || []).map((b) => (
                                                                <option key={b._id} value={b._id}>
                                                                    {b.lead?.clientName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Event Type <span className="text-red-500">*</span>
                                                        </label>
                                                        <select
                                                            name="eventType"
                                                            value={formData.eventType}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                        >
                                                            <option value="Haldi">Haldi</option>
                                                            <option value="Mehendi">Mehendi</option>
                                                            <option value="Wedding">Wedding</option>
                                                            <option value="Reception">Reception</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Event Date <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="eventDate"
                                                            value={formData.eventDate}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Start Time <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="time"
                                                            name="startTime"
                                                            value={formData.startTime}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            End Time <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="time"
                                                            name="endTime"
                                                            value={formData.endTime}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Venue <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="venue"
                                                            value={formData.venue}
                                                            onChange={handleChange}
                                                            required
                                                            placeholder="Grand Ballroom, Mumbai"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Notes
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="notes"
                                                            value={formData.notes}
                                                            onChange={handleChange}
                                                            placeholder="Flower decoration required"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                                    >
                                                        {loading ? "Creating..." : "Create Event"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </div>

        </>
    );
};

export default CreateEvent;