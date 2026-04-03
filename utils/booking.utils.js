

export const getStatusColor = (status) => {
  switch (status) {
    case "Pending":     return "bg-yellow-100 text-yellow-800";
    case "Confirmed":   return "bg-blue-100 text-blue-800";
    case "In Progress": return "bg-purple-100 text-purple-800";
    case "Completed":   return "bg-green-100 text-green-800";
    case "Cancelled":   return "bg-red-100 text-red-800";
    default:            return "bg-gray-100 text-gray-800";
  }
};


export const getPaymentColor = (status) => {
  switch (status) {
    case "Pending":  return "bg-yellow-100 text-yellow-800";
    case "Partial":  return "bg-orange-100 text-orange-800";
    case "Paid":     return "bg-green-100 text-green-800";
    case "Overdue":  return "bg-red-100 text-red-800";
    default:         return "bg-gray-100 text-gray-800";
  }
};


export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


export const formatCurrency = (amount) => {
  if (!amount) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};


export const canConfirm = (status) => status === "Pending";


export const canReject = (status) =>
  status === "Pending" || status === "Confirmed";


export const canComplete = (status, paymentStatus) =>
  (status === "Confirmed" || status === "In Progress") &&
  paymentStatus === "Paid";


export const canDelete = (status) =>
  status !== "Confirmed" && status !== "In Progress";