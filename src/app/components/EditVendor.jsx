"use client"
import React, { useState, useEffect } from 'react';
import { useVendor } from '../../../hooks/vendor.hooks';

const EditVendor = ({ vendor, onClose }) => {
    const { updateVendor } = useVendor();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        serviceType: "Photographer",
        email: "",
        phone: "",
        priceRange: "",
        location: "",
    });

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || "",
                email: vendor.email || "",
                phone: vendor.phone || "",
                serviceType: vendor.serviceType || "",
                priceRange: vendor.priceRange || "",
                location: vendor.location || "",
            });
        }
    }, [vendor]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateVendor(vendor._id, formData);
            onClose();
        } catch (error) {
            console.error("Error updating vendor:", error);
            alert("Failed to update vendor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Edit Vendor</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 ">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label for="serviceType" className='block text-sm font-medium text-gray-700 mb-2'>Choose a Service Type</label>
                            <select name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleChange}
                                className='w-full px-4 py-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-blue-500 focus:border-transparent'
                            >
                                <option value="Photographer">Photo Grapher</option>
                                <option value="Caterer">Caterer</option>
                                <option value="Decorator">Decorator</option>
                                <option value="Travel">Travel</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 ">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                                shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 ">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg
                                shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className='flex gap-4'>


                            <input
                                type="number"
                                name="priceRange"
                                placeholder='4323'
                                value={formData.priceRange}
                                onChange={handleChange}
                                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />


                            <input
                                type="text"
                                name="location"
                                placeholder='Mumbai'
                                value={formData.location}
                                onChange={handleChange}
                                className="flex-1 px-4  border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Vendor'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditVendor