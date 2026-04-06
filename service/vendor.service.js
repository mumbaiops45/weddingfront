import { createVendorApi , getAllVendorApi, getSingleVendorApi, updateVendorApi, deleteVendorApi } from "../api/vendor.api";



export const createVendorService = async (data) => {
    return await createVendorApi(data);
   
}


export const getAllVendorService = async (params) =>{
    const res =   await getAllVendorApi(params);
     return res.data;
    
}

export const getSingleVendorService = async (id) => {
    return await getSingleVendorApi(id);
    
}

export const updateVendorService = async (id , data) => {
    return await updateVendorApi(id , data);
    
}


export const deleteVendorService = async (id) => {
     return await deleteVendorApi(id);
    
}

