"use client"

import React, { useState, useEffect } from "react";
import { usePackageActions } from '../../../hooks/package.hook';

export default function Createpackage() {
 const { createNewPackage, loading, error, success } = usePackageActions();

  const [packageData, setPackageData] = useState({
    name: "",
    basePrice: 0,
    description: "",
    popularityScore: 0,
    services: [],
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (success) setMessage("Package created successfully!");
    if (error) setMessage("Error creating package, try again.");
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: name === "basePrice" || name === "popularityScore" ? Number(value) : value,
    });
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const newServices = [...packageData.services];
    newServices[index][name] = name === "price" ? Number(value) : value;
    setPackageData({ ...packageData, services: newServices });
  };

  const addService = () => {
    setPackageData({
      ...packageData,
      services: [...packageData.services, { serviceName: "", description: "", price: 0 }],
    });
  };

  const removeService = (index) => {
    const newServices = packageData.services.filter((_, i) => i !== index);
    setPackageData({ ...packageData, services: newServices });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewPackage(packageData); 
      setPackageData({
        name: "",
        basePrice: 0,
        description: "",
        popularityScore: 0,
        services: [],
      });
      setShowModal(false); 
    } catch (err) {
      console.error("Failed to create package", err);
    }
  };

  const resetForm = () => {
    setPackageData({
      name: "",
      basePrice: 0,
      description: "",
      popularityScore: 0,
      services: [],
    });
    setMessage("");
  };


    const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };
  return (

     <>
      <div className="p-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Package
        </button>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
           
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-[12px] font-bold text-gray-800">Create New Package</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Package Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Package Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={packageData.name}
                        onChange={handleChange}
                        placeholder="Enter package name"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="basePrice"
                        value={packageData.basePrice}
                        onChange={handleChange}
                        placeholder="Enter base price"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={packageData.description}
                        onChange={handleChange}
                        placeholder="Enter package description"
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Popularity Score
                      </label>
                      <input
                        type="number"
                        name="popularityScore"
                        value={packageData.popularityScore}
                        onChange={handleChange}
                        placeholder="Enter popularity score "
                        min="0"
                        
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-700">Services</h3>
                    <button
                      type="button"
                      onClick={addService}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Service
                    </button>
                  </div>
                  
                  {packageData.services.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <p className="text-gray-500">No services added yet. Click "Add Service" to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {packageData.services.map((service, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative group hover:shadow-md transition">
                          <button
                            type="button"
                            onClick={() => removeService(idx)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <h4 className="font-medium text-gray-700 mb-3">Service {idx + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Service Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="serviceName"
                                value={service.serviceName}
                                onChange={(e) => handleServiceChange(idx, e)}
                                placeholder="Enter service name"
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Price <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                name="price"
                                value={service.price}
                                onChange={(e) => handleServiceChange(idx, e)}
                                placeholder="Enter price"
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                required
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Description
                              </label>
                              <textarea
                                name="description"
                                value={service.description}
                                onChange={(e) => handleServiceChange(idx, e)}
                                placeholder="Enter service description"
                                rows="2"
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Package"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}