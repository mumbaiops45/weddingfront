import { createVendorApi , getAllVendorApi, getSingleVendorApi, updateVendorApi, deleteVendorApi } from "../api/vendor.api";



export const createVendorService = async (data) => {
    const res = await createVendorApi(data);
    return res.data;
}


export const getAllVendorService = async (params) =>{
    const res = await getAllVendorApi(params);
    return res.data;
}

export const getSingleVendorService = async (id) => {
    const res = await getSingleVendorApi(id);
    return res.data;
}

export const updateVendorService = async (id) => {
    const res = await updateVendorApi(id , data);
    return res.data;
}


export const deleteVendorService = async (id) => {
    const res = await deleteVendorApi(id);
    return res.data;
}

