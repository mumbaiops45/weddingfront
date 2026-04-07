"use client";

import React, { useState } from "react";
import { useBookings, useBookingActions, useBookingOrder } from "../../../hooks/booking.hooks";
import {
  getStatusColor,
  getPaymentColor,
  formatDate,
  formatCurrency,
  canConfirm,
  canReject,
  canComplete,
  canDelete,
} from "../../../utils/booking.utils";
import CreateBooking from "../components/CreateBooking";

const Page = () => {
  const { bookings, pagination, loading, error } = useBookings();
  const { order, sortBy, changeOrder } = useBookingOrder();
  const {
    confirmBooking,
    rejectBooking,
    completeBooking,
    deleteBooking,
    updatePaymentStatus,
    updateBooking,
  } = useBookingActions();

  const [rejectModal, setRejectModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);


  const [updateForm, setUpdateForm] = useState({
    totalPrice: "",
    paidAmount: "",
    eventDate: "",
    notes: "",
  });

  const handleConfirm = async (id) => {
    setActionLoading(id + "confirm");
    await confirmBooking(id);
    setActionLoading(null);
  };

  const handleReject = async () => {
    setActionLoading(selectedId + "reject");
    await rejectBooking(selectedId, rejectReason);
    setRejectModal(false);
    setRejectReason("");
    setSelectedId(null);
    setActionLoading(null);
  };

  const handleComplete = async (id) => {
    setActionLoading(id + "complete");
    await completeBooking(id);
    setActionLoading(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    setActionLoading(id + "delete");
    await deleteBooking(id);
    setActionLoading(null);
  };

  const handlePayment = async (id, status) => {
    setActionLoading(id + "payment");
    await updatePaymentStatus(id, status);
    setActionLoading(null);
  };


  const openUpdateModal = (booking) => {
    setSelectedId(booking._id);
    setUpdateForm({
      totalPrice: booking.totalPrice || "",
      paidAmount: booking.paidAmount || "",
      eventDate: booking.eventDate?.slice(0, 10) || "",
      notes: "",
    });
    setUpdateModal(true);
  };


  const handleUpdate = async () => {
    setActionLoading(selectedId + "update");
    const data = {
      totalPrice: Number(updateForm.totalPrice),
      paidAmount: Number(updateForm.paidAmount),
      eventDate: updateForm.eventDate,
      ...(updateForm.notes && { notes: [updateForm.notes] }),
    };
    await updateBooking(selectedId, data);
    setUpdateModal(false);
    setSelectedId(null);
    setActionLoading(null);
  };

  if (loading) return <div className="p-6 text-center">Loading bookings...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl  mx-auto p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex-shrink-0">All Bookings</h2>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => changeOrder(order, e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="createdAt">Sort by Created</option>
              <option value="eventDate">Sort by Event Date</option>
              <option value="totalPrice">Sort by Price</option>
            </select>
            <select
              value={order}
              onChange={(e) => changeOrder(e.target.value, sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

          </div>
          <CreateBooking />
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No bookings found</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {booking.lead?.clientName || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {booking.lead?.email} | {booking.lead?.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(booking.paymentStatus)}`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Event Date</p>
                  <p className="font-medium">{formatDate(booking.eventDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Price</p>
                  <p className="font-medium">{formatCurrency(booking.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Paid Amount</p>
                  <p className="font-medium">{formatCurrency(booking.paidAmount)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Package</p>
                  <p className="font-medium">{booking.package?.name || "N/A"}</p>
                </div>
              </div>


              {booking.vendors?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Vendors</p>
                  <div className="flex flex-wrap gap-2">
                    {booking.vendors.map((v) => (
                      <span key={v._id} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs">
                        {v.vendor?.name} — {v.assignedRole}
                      </span>
                    ))}
                  </div>
                </div>
              )}


              {booking.rejectionReason && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-600">
                  Rejection reason: {booking.rejectionReason}
                </div>
              )}


              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">


                {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                  <button
                    onClick={() => openUpdateModal(booking)}
                    className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                  >
                    Update
                  </button>
                )}

                {canConfirm(booking.status) && (
                  <button
                    onClick={() => handleConfirm(booking._id)}
                    disabled={actionLoading === booking._id + "confirm"}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {actionLoading === booking._id + "confirm" ? "..." : "Confirm"}
                  </button>
                )}

                {canReject(booking.status) && (
                  <button
                    onClick={() => { setSelectedId(booking._id); setRejectModal(true); }}
                    className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                )}

                {canComplete(booking.status, booking.paymentStatus) && (
                  <button
                    onClick={() => handleComplete(booking._id)}
                    disabled={actionLoading === booking._id + "complete"}
                    className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionLoading === booking._id + "complete" ? "..." : "Complete"}
                  </button>
                )}

                {booking.status !== "Cancelled" && booking.paymentStatus !== "Paid" && (
                  <select
                    onChange={(e) => handlePayment(booking._id, e.target.value)}
                    defaultValue={booking.paymentStatus}
                    className="px-3 py-1.5 border border-gray-300 text-sm rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                )}

                {canDelete(booking.status) && (
                  <button
                    onClick={() => handleDelete(booking._id)}
                    disabled={actionLoading === booking._id + "delete"}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-50"
                  >
                    {actionLoading === booking._id + "delete" ? "..." : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}


      {pagination && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <p>Total: {pagination.total} bookings</p>
          <p>Page {pagination.page} of {pagination.totalPages}</p>
        </div>
      )}


      {updateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Booking</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Total Price</label>
                <input
                  type="number"
                  value={updateForm.totalPrice}
                  onChange={(e) => setUpdateForm({ ...updateForm, totalPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Paid Amount</label>
                <input
                  type="number"
                  value={updateForm.paidAmount}
                  onChange={(e) => setUpdateForm({ ...updateForm, paidAmount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Event Date</label>
                <input
                  type="date"
                  value={updateForm.eventDate}
                  onChange={(e) => setUpdateForm({ ...updateForm, eventDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Add Note</label>
                <textarea
                  value={updateForm.notes}
                  onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
                  placeholder="Add a note..."
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mt-1"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdate}
                disabled={actionLoading}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {actionLoading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={() => { setUpdateModal(false); setSelectedId(null); }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reject Booking</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? "Rejecting..." : "Confirm Reject"}
              </button>
              <button
                onClick={() => { setRejectModal(false); setRejectReason(""); setSelectedId(null); }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;