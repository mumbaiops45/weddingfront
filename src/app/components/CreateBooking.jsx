"use client";

import React, { useState, useEffect } from "react";
import { useCreateBooking } from "../../../hooks/booking.hooks";
import { useLeads } from "../../../hooks/lead.hook";
import { usePackages } from "../../../hooks/package.hook";
import { useVendor } from "../../../hooks/vendor.hooks";
import useToast from "../../../hooks/useToast";


const CreateBooking = () => {
  const { createBooking, loading, error, success, reset } = useCreateBooking();
  const { leads, loading: leadsLoading } = useLeads();
  const { packages, loading: packagesLoading } = usePackages();
  const { vendors, loading: vendorsLoading, fetchVendors } = useVendor();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    lead: "",
    package: "",
    vendors: [],
    eventDate: "",
    totalPrice: "",
    paymentStatus: "Pending",
    notes: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVendorChange = (index, field, value) => {
    const updatedVendors = [...formData.vendors];
    updatedVendors[index][field] = value;

    setFormData({ ...formData, vendors: updatedVendors });
  }

  const addVendor = () => {
    setFormData({
      ...formData,
      vendors: [...formData.vendors, { vendor: "", assignedRole: "" }],
    });
  };

  const removeVendor = (index) => {
    const updatedVendors = formData.vendors.filter((_, i) => i !== index);
    setFormData({ ...formData, vendors: updatedVendors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.lead) {
      showError("Please select a lead");
      return;
    }

    if (!formData.package) {
      showError("Please select a package");
      return;
    }

    if (!formData.eventDate) {
      showError("Please select event date");
      return;
    }

    if (!formData.totalPrice || Number(formData.totalPrice) <= 0) {
      showError("Please enter valid total price");
      return;
    }

    const validVendors = formData.vendors.filter(
      (v) => v.vendor && v.assignedRole
    );

    if (formData.vendors.length > 0 && validVendors.length === 0) {
      showError("Please fill vendor details correctly");
      return;
    }

    const data = {
      lead: formData.lead,
      package: formData.package,
      eventDate: formData.eventDate,
      totalPrice: Number(formData.totalPrice),
      paymentStatus: formData.paymentStatus,
      notes: formData.notes ? [formData.notes] : [],
      vendors: validVendors,
    };

    try {
      const result = await createBooking(data);

      if (result) {
        showSuccess("Booking created successfully");
        setFormData({
          lead: "",
          package: "",
          vendors: "",
          eventDate: "",
          totalPrice: "",
          paymentStatus: "Pending",
          notes: "",
        });
        setShowForm(false);
        reset();
      } else {
        showError("Failed to create booking");
      }
    } catch (err) {
      showError("Something went worng");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  return (
    <div className="p-2 ">
      <div className="flex  justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Create Booking
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div
            className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Create New Booking
            </h3>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                Booking created successfully!
              </div>

            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lead Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="lead"
                    value={formData.lead}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="">
                      {leadsLoading ? "Loading leads..." : "Select Lead"}
                    </option>

                    {leads.map((lead) => (
                      <option key={lead._id} value={lead._id}>
                        {lead.clientName}
                      </option>
                    ))}
                  </select>

                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Name <span className="text-red-500">*</span>
                  </label>


                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="">
                      {packagesLoading ? "Loading packages..." : "Select Package"}
                    </option>
                    {packages.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>



                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vendors <span className="text-red-500">*</span>
                  </label>

                  {formData.vendors.map((v, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        value={v.vendor}
                        onChange={(e) => handleVendorChange(index, "vendor", e.target.value)}
                        required
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">
                          {vendorsLoading ? "Loading vendors..." : "Select Vendor"}
                        </option>

                        {vendors.map((vendor) => (
                          <option key={vendor._id} value={vendor._id}>
                            {vendor.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={v.vendor}
                        onChange={(e) => handleVendorChange(index, "vendor", e.target.value)}
                        required
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">
                          {vendorsLoading ? "Loading vendors..." : "Select Vendor"}
                        </option>

                        {vendors.map((vendor) => (
                          <option key={vendor._id} value={vendor._id}>
                            ({vendor.serviceType})
                          </option>
                        ))}
                      </select>


                      {formData.vendors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVendor(index)}
                          className="px-2 text-red-500"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}


                  <button
                    type="button"
                    onClick={addVendor}
                    className="mt-2 text-blue-600 text-sm"
                  >
                    + Add Vendor
                  </button>
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
                    Total Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    required
                    placeholder="500000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Initial booking created"
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
                  {loading ? "Creating..." : "Create Booking"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;