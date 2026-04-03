"use client";

import React, { useState } from "react";
import { useCreateBooking } from "../../../hooks/booking.hooks";

const CreateBooking = () => {
  const { createBooking, loading, error, success, reset } = useCreateBooking();

  const [formData, setFormData] = useState({
    lead: "",
    package: "",
//    vendors: [
//     { vendor: "", assignedRole: "" }
//   ],
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

    setFormData({...formData, vendors: updatedVendors});
  }

  const addVendor = () => {
  setFormData({
    ...formData,
    vendors: [...formData.vendors, { vendor: "", assignedRole: "" }],
  });
};

  const removeVendor = (index) => {
    const updatedVendors = formData.vendors.filter((_, i) => i !== index);
    setFormData({...formData, vendors: updatedVendors});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validVendors = formData.vendors.filter(
    (v) => v.vendor && v.assignedRole
  );

    const data = {
      lead: formData.lead,
      package: formData.package,
      eventDate: formData.eventDate,
      totalPrice: Number(formData.totalPrice),
      paymentStatus: formData.paymentStatus,
      notes: formData.notes ? [formData.notes] : [],
    //   vendors: [
    // {
    //   vendor: formData.vendorId,
    //   assignedRole: formData.assignedRole,
    // },
//   ],
vendors: validVendors,
    };

    console.log("Sending Data:", data);
    
    const result = await createBooking(data);

    if (result) {
      alert("Booking created successfully!");
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
    }
  };

  return (
    <div className="mb-6">

      
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "+ Create Booking"}
      </button>

      
      {showForm && (
        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-6">
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
                  Lead ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lead"
                  value={formData.lead}
                  onChange={handleChange}
                  required
                  placeholder="69ccb9550b30a358fdde0f8f"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                  placeholder="69ccf0db17a6c91dc3a851ab"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
             
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendors <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  required
                  placeholder="69ccb9550b30a358fdde0f8f"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Assigned Role <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    name="assignedRole"
    value={formData.assignedRole}
    onChange={handleChange}
    required
    placeholder="Photographer"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
  />
              </div> */}
              
              <div className="col-span-2">
<label className="block text-sm font-medium text-gray-700 mb-2">
    Vendors <span className="text-red-500">*</span>
  </label>

  {formData.vendors.map((v, index) => (
    <div key={index} className="flex gap-2 mb-2">

      {/* Vendor ID */}
      <input
        type="text"
        value={v.vendor}
        onChange={(e) =>
          handleVendorChange(index, "vendor", e.target.value)
        }
        placeholder="Vendor ID"
        required
        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />

      {/* Role */}
      <input
        type="text"
        value={v.assignedRole}
        onChange={(e) =>
          handleVendorChange(index, "assignedRole", e.target.value)
        }
        placeholder="Photographer"
        required
        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
      />

      {/* Remove Button */}
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

  {/* Add Vendor Button */}
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
      )}
    </div>
  );
};

export default CreateBooking;