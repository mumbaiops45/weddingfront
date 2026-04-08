"use client"
import React from 'react'
import { useLeads , useSearchLeads  } from '../../../hooks/lead.hook'
import Createlead from '../components/Createlead'


const page = () => {

    const { leads, loading, error } = useLeads();    

    if (loading) return <p>Loading leads...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <Createlead />
            
            <div className="overflow-x-auto mx-[30px] rounded-lg border border-gray-200 shodow-sm">
                <table className="min-w-full text-[13px] text-gray-700 ">
                    <thead className="bg-black text-[11px] font-bold uppercase tracking-wider text-white">
                        <tr>
                            <th className="border px-4 py-2 text-center">Name / Phone</th>
                            <th className=" border px-4 py-2 text-center">Email</th>
                            <th className=" border px-4 py-2 text-center">Wedding Date</th>
                            <th className="border px-4 py-2 text-center">Location</th>
                            <th className="border px-4 py-2 text-center">Budget</th>
                            <th className="border px-4 py-2 text-center">Guest Count</th>
                            <th className="border px-4 py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {leads.map((lead) => (
                            <tr key={lead._id} className=" hover:bg-gray-50">

                                <td className="border  px-4 py-1">
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium">{lead.clientName}</span>
                                        <span className="text-[13px] text-gray-500">{lead.phone}</span>
                                    </div>
                                </td>
                                <td className="border px-4 py-1">{lead.email}</td>
                                <td className="border px-4 py-1">{lead.weddingDateFormatted}</td>
                                <td className="border px-4 py-1">{lead.location}</td>
                                <td className="border px-4 py-1">₹{new Intl.NumberFormat('en-IN').format(lead.budget)}</td>
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
