import { create } from "zustand";
import { createPackageService , getpackageService } from "../service/package.service";


export const usePackageStore = create((set) => ({
    packages: [],
    loading: false,
    error: null,

    fetchPackages: async () => {
        set({loading: true, error: null});

        try {
            const data = await getpackageService();
            set({packages: data , loading: false});
        } catch (error) {
           set({error: error.message, loading: false});
        }
    },
}))

export const useCreatePackage = create((set) => ({
    loading: false,
    error: null,
    success: false,

    createpackage: async (packageData) => {
        set({loading: true, error: null, success: false});
        try {
            const newPackage = await createPackageService(packageData);
            set({loading: false, success: true});
            return newPackage;
        } catch (error) {
            set({
                error: error.response?.data?.message || "Failed to create package",
                loading: false,
                success: false,
            });
        }
    },
}))


