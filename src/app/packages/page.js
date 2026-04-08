"use client";

import React, { useState, useEffect } from "react";
import { usePackages } from "../../../hooks/package.hook";
import Createpackage from "../components/Createpackage";

export default function Page() {
  const { packages, loading, error, fetchPackages } = usePackages();
  const [openCard, setOpenCard] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading packages...</p>;
  if (error)   return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Createpackage />

      
      <div className="grid grid-cols-1 gap-4 mt-6">
        {packages?.map((pkg) => (
          <div
            key={pkg._id}
            className="border bg-gray-100 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
           
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800">{pkg.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p className="text-lg font-bold text-green-600">
                    ₹{pkg.basePrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    ⭐ Popularity: {pkg.popularityScore}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">
                  {pkg.services.length} service{pkg.services.length !== 1 ? "s" : ""}
                </p>
               
                <button
                  onClick={() => toggleCard(pkg._id)}
                  className="flex items-center gap-1 text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                >
                  {openCard === pkg._id ? "Hide Services ▲" : "View Services ▼"}
                </button>
              </div>
            </div>

            
            {openCard === pkg._id && (
              <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Services Included
                </h3>
                {pkg.services.length ? (
                  <ul className="space-y-3">
                    {pkg.services.map((service) => (
                      <li
                        key={service._id}
                        className="flex justify-between items-start bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">
                            {service.serviceName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {service.description}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-green-600 ml-4 shrink-0">
                          ₹{service.price.toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No services added yet</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}