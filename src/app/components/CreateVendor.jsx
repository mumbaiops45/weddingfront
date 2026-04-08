"use client"
import React, { useState } from 'react';
import { useVendor } from '../../../hooks/vendor.hooks';
import { useToast } from '../../../hooks/useToast';

const CreateVendor = () => {
    const { createVendor, loading, error, success } = useVendor();
    const [isOpen, setIsOpen] = useState(false);
    const { showError, showSuccess } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        serviceType: "Photographer",
        email: "",
        phone: "",
        priceRange: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            showError("Vendor name is required");
            return;
        }

        if (!formData.serviceType) {
            showError("Please select a service type");
            return;
        }

        if (!formData.email) {
            showError("Email is required");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            showError("Enter a valid email");
            return;
        }

        if (!formData.phone) {
            showError("Phone number is required");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {
            showError("Enter a valid 10-digit phone number");
            return;
        }

        if (!formData.priceRange) {
            showError("Price range is required");
            return;
        }

        if (!formData.location) {
            showError("Location is required");
            return;
        }

        try {
            const result = await createVendor(formData);

            if (result) {
                showSuccess("Vendor created successfully");

                setFormData({
                    name: "",
                    serviceType: "Photgrapher",
                    email: "",
                    phone: "",
                    priceRange: "",
                    location: "",
                });
                setIsOpen(false);
            } else {
                showError("Failed to create vendor");
            }
        } catch (error) {
              showError("Something went wrong");
            console.error(error);
        }
    };

    const onClose = () => setIsOpen(false);
    return (
        <>

            <button
                onClick={() => setIsOpen(true)}
                className="bg-black text-white px-6 py-2 rounded-lg  transition font-medium"
            >
                Create Vendor
            </button>
            <div className={`fixed  inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-md transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>

                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative transform transition-transform duration-300 ease-out scale-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>Vendor created!</p>}

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>Enter Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <label htmlFor="serviceType" className='block text-sm font-medium text-gray-700 mb-2'>Choose a Service Type</label>
                        <select name="serviceType" id="serviceType" value={formData.serviceType} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Photographer">Photo Grapher</option>
                            <option value="caterer">Caterer</option>
                            <option value="Decorator">Decorator</option>
                            <option value="Travel">Travel</option>
                            <option value="Other">Other</option>
                        </select>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Enter Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-2'>Enter Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder='9876543210'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className='flex '>


                            <input
                                type="number"
                                name="priceRange"
                                placeholder='1000-2000'
                                value={formData.priceRange}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

                            />

                            <input
                                type="text"
                                name="location"
                                placeholder='Mumbai'
                                value={formData.location}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        </div>
                        <button type="submit" disabled={loading}
                            className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                        >{loading ? "Creating..." : "Create Vendor"}</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateVendor
