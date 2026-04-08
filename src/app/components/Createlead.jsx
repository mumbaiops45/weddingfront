"use client";

import React, { useState } from "react";
import { Dialog, DialogBackdrop } from '@headlessui/react'
import { useCreateLead } from "../../../hooks/lead.hook";
import useToast from "../../../hooks/useToast";

const Createlead = () => {
  const { addLead, loading, error, success } = useCreateLead();
  const [open, setOpen] = useState(false)
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    weddingDate: "",
    location: "",
    budget: "",
    guestCount: "",
    source: "Other",
    status: "New",
  });

  const [followUp, setFollowUp] = useState({
    note: "",
    followUpDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFollowUpChange = (e) => {
    setFollowUp({ ...followUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientName) {
      showError("Client name is required");
      return;
    }

    if (!formData.phone) {
      showError("Phone number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      showError("Enter valid 10-digit phone number");
      return;
    }

    if (!formData.email) {
      showError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showError("Enter valid email address");
      return;
    }

    if (!formData.weddingDate) {
      showError("Please select wedding date");
      return;
    }

    if (!formData.location) {
      showError("Location is required");
      return;
    }

    if (formData.budget && Number(formData.budget) <= 0) {
      showError("Budget must be greater than 0");
      return;
    }

    if (formData.guestCount && Number(formData.guestCount) <= 0) {
      showError("Guest count must be greater than 0");
      return;
    }

    const leadData = {
      ...formData,
      guestCount: Number(formData.guestCount),
      ...(followUp.note && {
        followUps: [{
          note: followUp.note,
          followUpDate: followUp.followUpDate || undefined,
        }],
      }),
    };

    try {
      const result = await addLead(leadData);

      if (result) {
        showSuccess("Lead created successfully!");
        setFormData({
          clientName: "",
          phone: "",
          email: "",
          weddingDate: "",
          location: "",
          budget: "",
          guestCount: "",
          source: "Other",
          status: "New",
        });
        setFollowUp({ note: "", followUpDate: "" });
        setOpen(false);
      } else {
        showError("Failed to create lead");
      }
    } catch (error) {
      showError("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex my-2">
        <button
          onClick={() => setOpen(true)}
          className="ml-auto mr-[30px] rounded-md bg-black px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-black/50"
        >
          Create Lead
        </button>

        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center  px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <h2 className="text-[12px] font-semibold text-gray-800">Create New Lead</h2>
                    <button
                      className="font-bold text-lg cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200  transition"
                      onClick={() => setOpen(false)}
                    >
                      <p>X</p>
                    </button>
                  </div>


                  {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                      Lead created successfully!
                    </div>
                  )}

                  <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Client Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter full name"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="10-digit mobile number"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px]  text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="client@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Wedding Date
                          </label>
                          <input
                            type="date"
                            name="weddingDate"
                            value={formData.weddingDate}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
                        Wedding Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="City, Venue"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Budget
                          </label>
                          <input
                            type="text"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Expected budget"
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Guest Count
                          </label>
                          <input
                            type="number"
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Number of guests"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Source
                          </label>
                          <select
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                          >
                            <option value="Instagram">Instagram</option>
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Ads">Ads</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-medium text-gray-700 mb-2">
                            Status
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className=" rounded-lg ">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-[12px] font-medium text-gray-700 mb-2">
                              Note
                            </label>
                            <textarea
                              name="note"
                              value={followUp.note}
                              onChange={handleFollowUpChange}
                              rows="3"
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                              placeholder="Add follow-up notes..."
                            />
                          </div>

                          <div>
                            <label className="block text-[12px] font-medium text-gray-700 mb-2">
                              Follow-up Date
                            </label>
                            <input
                              type="date"
                              name="followUpDate"
                              value={followUp.followUpDate}
                              onChange={handleFollowUpChange}
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-200 justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className=" bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {loading ? "Creating..." : "Create Lead"}
                      </button>
                      <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Dialog>

      </div>

    </>
  );
};

export default Createlead;