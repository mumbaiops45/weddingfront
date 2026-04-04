// "use client";

// import React, {useEffect} from "react";
// import { usePaymentStore } from "../store/payment.store";

// export const usePayments = (params) => {
//     const {payments , loading, error, fetchPayments} = usePaymentStore();


//     useEffect (() => {
//         fetchPayments(params);
//     }, []);

//     return { payments: payments || [], loading, error };

//     };

//     export const usePayment = (id) =>{
//         const {payment, loading, error, fetchPayment} = usePaymentStore();

//         useEffect (() => {
//             if(id) fetchPayment(id);
//         }, [id]);

//         return {payment, loading, error};
//     }

//     export const useUpdatePayment = () =>{
//         const {updatePayment, loading, error, success, reset} = usePaymentStore();
//         return {updatePayment, loading, error, success, reset};
//     }

//     export const useDeletePayment = () =>{
//       const {deletePayment , loading, error, success, reset} = usePaymentStore();

//       return {deletePayment, loading, error, success , reset};
//     }

//     export const usePaymentActions = () => {
//         const {
//             createPayment,
//             updatePayment,
//             deletePayment,
//             loading,
//             error,
//             success,
//             reset,
//         } = usePaymentStore();

//         return {
//             createPayment,
//             updatePayment,
//             deletePayment,
//             loading,
//             error,
//             success,
//             reset,
//         }
//     }


"use client";

import { useEffect } from "react";
import { usePaymentStore } from "../store/payment.store";

export const usePayments = (params) => {
    const { payments, loading, error, fetchPayments } = usePaymentStore();

    useEffect(() => {
        fetchPayments(params);
    }, []);

    return { payments: payments || [], loading, error };
};

export const usePayment = (id) => {
    const { payment, loading, error, fetchPayment } = usePaymentStore();

    useEffect(() => {
        if (id) fetchPayment(id);
    }, [id]);

    return { payment, loading, error };
};


export const useCreatePayment = () => {
    const { createPayment, loading, error, success, reset } = usePaymentStore();
    return { createPayment, loading, error, success, reset };
};

export const useUpdatePayment = () => {
    const { updatePayment, loading, error, success, reset } = usePaymentStore();
    return { updatePayment, loading, error, success, reset };
};

export const useDeletePayment = () => {
    const { deletePayment, loading, error, success, reset } = usePaymentStore();
    return { deletePayment, loading, error, success, reset };
};

export const usePaymentActions = () => {
    const {
        createPayment,
        updatePayment,
        deletePayment,
        loading,
        error,
        success,
        reset,
    } = usePaymentStore();

    return {
        createPayment,
        updatePayment,
        deletePayment,
        loading,
        error,
        success,
        reset,
    };
};