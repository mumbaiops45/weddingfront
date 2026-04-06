import { useVendorStore } from "../store/vendor.store";

export const useVendor = () => {
    const {
        vendors, 
        vendor,
        loading,
        error,
        success,
        reset,
        fetchVendors,
        fetchVendor,
        createVendor,
        updateVendor, 
        deleteVendor,
    } = useVendorStore();

    return {
        vendors,
        vendor,
        loading,
        error,
        success,
        reset,
        fetchVendors,
        fetchVendor,
        createVendor,
        updateVendor,
        deleteVendor,
    };
};