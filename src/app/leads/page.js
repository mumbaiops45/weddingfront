"use client"
import React from 'react'
import { useLeads } from '../../../hooks/lead.hook'
import Createlead from '../components/Createlead'

const page = () => {

    const { leads, loading, error } = useLeads();

    if (loading) return <p>Loading leads...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <Createlead />
            <div className="overflow-x-auto">
                <table className="min-w-full text-[13px] border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Name / Phone</th>
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

                                <td className="border px-4 py-1">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{lead.clientName}</span>
                                        <span className="text-sm text-gray-500">{lead.phone}</span>
                                    </div>
                                </td>
                                <td className="border px-4 py-1">{lead.email}</td>
                                <td className="border px-4 py-1">{lead.weddingDateFormatted}</td>
                                <td className="border px-4 py-1">{lead.location}</td>
                                <td className="border px-4 py-1">{lead.budget}</td>
                                <td className="border px-4 py-1">{lead.guestCount}</td>
                                <td className="border px-4 py-1">{lead.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
