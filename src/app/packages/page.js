"use client"

import React, { useState, useEffect } from "react";
import { usePackages } from '../../../hooks/package.hook';
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

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <Createpackage />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {packages?.map((pkg) => (
          <div key={pkg._id}
            className="border p-4 rounded-xl shadow-md hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-bold">{pkg.name}</h2>

            <p className="font-semibold text-gray-800">Base Price: {pkg.basePrice.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
            <p className="text-sm mt-1">Popularity: {pkg.popularityScore}</p>
            {pkg.weddingDateFormatted && (<p>Wedding Date: {pkg.weddingDateFormatted}</p>)}

            <button onClick={() => toggleCard(pkg._id)}
              className="mt-3 text-blue-600 font-semibold hover:underline">
              {openCard === pkg._id ? "Show Less" : "Read More"}
            </button>

            {openCard === pkg._id && (
              <div className="mt-3">
                <h3 className="font-semibold">Services:</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2">
                  {pkg.services.length ? (
                    pkg.services.map((service) => (
                      <li key={service._id}>
                        <span className="font-medium">{service.serviceName}</span>
                        {" "}
                        - ₹{service.price.toLocaleString()}
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </li>
                    ))
                  ) : (
                    <li>No Services</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}