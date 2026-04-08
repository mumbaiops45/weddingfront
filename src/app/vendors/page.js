"use client"
import React, { useEffect, useState } from 'react'
import { useVendor } from '../../../hooks/vendor.hooks';
import CreateVendor from '../components/CreateVendor';
import EditVendor from '../components/EditVendor';
import useToast from '../../../hooks/useToast';


const page = () => {
  const { vendors, loading, error, fetchVendors, deleteVendor } = useVendor();
  const [editingVendor, setEditingVendor] = useState(null);
  const {showSuccess , showError} = useToast();

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) return <p>Loading vendor...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (id) => {
    try {
      await deleteVendor(id);
      showError("Delete Succesfull Vendor")
    } catch (error) {
      console.error(error.message);
    }
  }

  return (


    <div className="p-6">

      <div className="flex  justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Vendors</h1>
        <CreateVendor />
      </div>
      {vendors.length === 0 ? (
        <p>No Vendor available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-200 rounded-lg">
            <thead className="bg-black text-[13px] text-white">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Service Type</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Price Range</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v._id} className="hover:bg-gray-50 text-[13px]">
                  <td className="px-4 py-2 border">{v.name}</td>
                  <td className="px-4 py-2 border">{v.email}</td>
                  <td className="px-4 py-2 border">{v.phone}</td>
                  <td className="px-4 py-2 border">{v.serviceType}</td>
                  <td className="px-4 py-2 border">{v.location}</td>
                  <td className="px-4 py-2 border">{v.priceRange}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                      onClick={() => setEditingVendor(v)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      onClick={() => handleDelete(v._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingVendor && (
        <EditVendor
          vendor={editingVendor}
          onClose={() => setEditingVendor(null)}
        />
      )}
    </div>

  )
}

export default page