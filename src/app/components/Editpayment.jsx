"use client";

import React, { useState, useEffect } from "react";
import { useUpdatePayment } from "../../../hooks/payment.hook";
import useToast from "../../../hooks/useToast";

const Editpayment = ({ payment, onSuccess, onCancel }) => {
  const { updatePayment, loading, error, success, reset } = useUpdatePayment();
  const {showSuccess , showError} = useToast();

  const [formData, setFormData] = useState({
    amount: "",
    paymentMode: "UPI",
    paymentDate: "",
    transactionId: "",
    notes: "",
    status: "Pending",
  });

 
  useEffect(() => {
    if (payment) {
      setFormData({
        amount: payment.amount || "",
        paymentMode: payment.paymentMode || "UPI",
        paymentDate: payment.paymentDate?.slice(0, 10) || "",
        transactionId: payment.transactionId || "",
        notes: payment.notes || "",
        status: payment.status || "Pending",
      });
    }
  }, [payment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      amount: Number(formData.amount),
      paymentMode: formData.paymentMode,
      paymentDate: formData.paymentDate,
      transactionId: formData.transactionId || undefined,
      notes: formData.notes || undefined,
      status: formData.status,
    };

    const result = await updatePayment(payment._id, data);

    if (result) {
      showSuccess("Payment updated successfully!");
      reset();
      if (onSuccess) onSuccess();
    } else if (error){
      showError(error || "Failed to update payment.");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Edit Payment</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Update payment — ID: {payment?._id?.slice(-8)}
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
            ✅ Payment updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

           
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
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Mode <span className="text-red-500">*</span>
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="UPI">📱 UPI</option>
                <option value="Cash">💵 Cash</option>
                <option value="Bank Transfer">🏦 Bank Transfer</option>
                <option value="Cheque">📄 Cheque</option>
                <option value="Card">💳 Card</option>
                <option value="Other">💰 Other</option>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="Pending">🟡 Pending</option>
                <option value="Paid">🟢 Paid</option>
                <option value="Failed">🔴 Failed</option>
                <option value="Refunded">🟣 Refunded</option>
              </select>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
                <span className="text-gray-400 text-xs ml-1">(optional)</span>
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add payment notes"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          </div>

       
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editpayment;