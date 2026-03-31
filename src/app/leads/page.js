"use client"
import React from 'react'
import { useLeads } from '../../../hooks/lead.hook'

const page = () => {

    const { leads, loading, error } = useLeads();

    if (loading) return <p>Loading leads...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Phone</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Wedding Date</th>
                            <th className="border px-4 py-2 text-left">Location</th>
                            <th className="border px-4 py-2 text-left">Budget</th>
                            <th className="border px-4 py-2 text-left">Guest Count</th>
                            <th className="border px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{lead.clientName}</td>
                                <td className="border px-4 py-2">{lead.phone}</td>
                                <td className="border px-4 py-2">{lead.email}</td>
                                <td className="border px-4 py-2">{lead.weddingDateFormatted}</td>
                                <td className="border px-4 py-2">{lead.location}</td>
                                <td className="border px-4 py-2">{lead.budget}</td>
                                <td className="border px-4 py-2">{lead.guestCount}</td>
                                <td className="border px-4 py-2">{lead.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
