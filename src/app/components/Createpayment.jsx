"use client";

import React, { useState } from 'react';
import { useCreatePayment } from "../../../hooks/payment.hook";
import { useBookings } from '../../../hooks/booking.hooks';

const Createpayment = () => {

  const { createPayment, loading, error, success, reset } = useCreatePayment();
  const { bookings, loading: bookingsLoading, error: bookingsError } = useBookings();

  const [formData, setFormData] = useState({
    booking: "",
    amount: "",
    paymentMethod: "Cash",
    paymentDate: "",
    transactionId: "",
    transactionId: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      booking: formData.booking,
      amount: Number(formData.amount),
      paymentMethod: formData.paymentMethod,
      paymentDate: formData.paymentDate,
      transactionId: formData.transactionId || undefined,
      notes: formData.notes || undefined,
    };

    const result = await createPayment(data);

    if (result) {
      alert("Payment created successfully!");
      setFormData({
        booking: "",
        amount: "",
        paymentMethod: "Cash",
        paymentDate: "",
        transactionId: "",
        notes: "",
      });
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Payment
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Add a new payment record
          </p>
        </div>

        <div className="p-6">


          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              ❌ {error}
            </div>
          )}


          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              ✅ Payment created successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Name <span className="text-red-500">*</span>
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
                Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="Card">Card</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transaction ID
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="UPI ref / Bank ref number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Add any payment notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              />
            </div>

        
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? "Creating..." : "Create Payment"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    booking: "",
                    amount: "",
                    paymentMethod: "Cash",
                    paymentDate: "",
                    transactionId: "",
                    notes: "",
                  });
                  reset();
                }}
                className="px-6 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Createpayment
