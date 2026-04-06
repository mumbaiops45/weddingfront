"use client"
import { useEffect } from "react";
import {useCreatePackage , usePackageStore } from "../store/package.store";

export const usePackages = () => {
    const {packages, loading, error, fetchPackages} = usePackageStore();
    
    
  useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);
    return {
        packages,
        loading,
        error,
        fetchPackages
    };
};


export const usePackageActions = () =>{
    const {createpackage , loading , error, success} = useCreatePackage();

    const createNewPackage = async (packageData) => {
        return await createpackage(packageData);
    };

    return {
        createNewPackage,
        loading,
        error,
        success,
    };
};



