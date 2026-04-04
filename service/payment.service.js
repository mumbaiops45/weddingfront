import { createPaymentApi, getAllPaymentApi , getSinglePaymentApi, updatePaymentApi , deletePaymentApi  } from "../api/payment.api";


export const createPaymentService = async (data) => {
    const res = await createPaymentApi(data);
    return res.data;
}


export const getAllPaymentService = async (params) => {
    const res = await getAllPaymentApi(params);
    return {
        payments: res.data || [],
    };
};


export const getSinglePaymentService = async(id) =>{
    const res = await getSinglePaymentApi(id);
    return res.data;
}

export const updatePaymentService = async (id, data) => {
    const res = await updatePaymentApi(id, data);
    return res.data;
};

export const deletePaymentService = async (id) => {
    const res = await deletePaymentApi(id);
    return res.data;
}

