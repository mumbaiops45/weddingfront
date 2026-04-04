"use client";

import React, { useState } from "react";
import { usePayments, usePaymentActions } from "../../../hooks/payment.hook";
import Createpayment from "../components/Createpayment";
import Editpayment from "../components/Editpayment";

const Page = () => {
  const { payments, loading, error } = usePayments();
  const { deletePayment } = usePaymentActions();

  const [showCreate, setShowCreate] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this payment?")) return;
    setActionLoading(id);
    await deletePayment(id);
    setActionLoading(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Failed": return "bg-red-100 text-red-700";
      case "Refunded": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case "UPI": return "📱";
      case "Cash": return "💵";
      case "Bank Transfer": return "🏦";
      case "Cheque": return "📄";
      case "Card": return "💳";
      default: return "💰";
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (loading) return (
    <div className="p-6 text-center text-gray-500">Loading payments...</div>
  );

  return (



    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {payments.length} payment{payments.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => { setShowCreate(!showCreate); setEditingPayment(null); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          {showCreate ? "Cancel" : "+ Add Payment"}
        </button>
      </div>
      {showCreate && (
        <div className="mb-6">
          <Createpayment onSuccess={() => setShowCreate(false)} />
        </div>
      )}

      {editingPayment && (
        <div className="mb-6">
          <Editpayment
            payment={editingPayment}
            onSuccess={() => {
              setEditingPayment(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onCancel={() => setEditingPayment(null)}
          />
        </div>
      )}

    
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

   
      {payments.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Total Payments</p>
            <p className="text-xl font-bold text-gray-800">{payments.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Total Amount</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Paid</p>
            <p className="text-xl font-bold text-blue-600">
              {payments.filter((p) => p.status === "Paid").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 mb-1">Pending</p>
            <p className="text-xl font-bold text-yellow-600">
              {payments.filter((p) => p.status === "Pending").length}
            </p>
          </div>
        </div>
      )}

    
      {!payments || payments.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-200">
          No payments found
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
             
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
                    {getPaymentModeIcon(payment.paymentMode)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {payment.booking?.lead?.clientName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {payment.booking?.lead?.phone} • {payment.booking?.lead?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                  <p className="text-lg font-bold text-gray-800">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>
              </div>

             
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Payment Mode</p>
                  <p className="font-medium text-gray-700">
                    {getPaymentModeIcon(payment.paymentMode)} {payment.paymentMode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Payment Date</p>
                  <p className="font-medium text-gray-700">
                    {formatDate(payment.paymentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Transaction ID</p>
                  <p className="font-medium text-gray-700 text-xs truncate">
                    {payment.transactionId || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Package</p>
                  <p className="font-medium text-gray-700">
                    {payment.booking?.package?.name || "N/A"}
                  </p>
                </div>
              </div>

             
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Booking Total</p>
                  <p className="font-medium text-gray-700">
                    {formatCurrency(payment.booking?.totalPrice || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Event Date</p>
                  <p className="font-medium text-gray-700">
                    {formatDate(payment.booking?.eventDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Booking Status</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${payment.booking?.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : payment.booking?.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {payment.booking?.status || "N/A"}
                  </span>
                </div>
              </div>

              
              {payment.notes && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-1">Notes</p>
                  <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    {payment.notes}
                  </p>
                </div>
              )}

              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs text-gray-500 border-t border-gray-100 pt-3">
                <div>
                  <span className="text-gray-400">Location: </span>
                  <span className="font-medium">{payment.booking?.lead?.location || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Budget: </span>
                  <span className="font-medium">₹{payment.booking?.lead?.budget || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Source: </span>
                  <span className="font-medium">{payment.booking?.lead?.source || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Guests: </span>
                  <span className="font-medium">{payment.booking?.lead?.guestCount || "N/A"}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingPayment(payment); 
                    setShowCreate(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment._id)}
                  disabled={actionLoading === payment._id}
                  className="px-4 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 disabled:opacity-50 transition"
                >
                  {actionLoading === payment._id ? "Deleting..." : "Delete"}
                </button>
                <div className="ml-auto text-xs text-gray-400 self-center">
                  Created: {formatDate(payment.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;