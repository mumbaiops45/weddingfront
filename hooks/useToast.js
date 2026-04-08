"use client"

import useToastStore from '../store/toast.store'

 export const useToast = () => {

    const { success , error, warning , info, loading, dismiss , dismissAll, updateToast} = useToastStore();

    const promise = async(promiseFn , messages , duration =3000) => {
        const loadingId = loading(messages.loading);

        try {
            const result = await promiseFn;
            updateToast(loadingId , messages.success, 'succcess');
            setTimeout(() => dismiss(loadingId), duration);
            return result;
        } catch (error) {
            updateToast(loadingId , messages.error , 'error');
            setTimeout(() => dismiss(loadingId) , duration);

            throw error;
        }
    };

    
  return {
    showSuccess: success,
    showError: error,
    showWarning: warning,
    showInfo: info,
    showLoading: loading,
    showPromise: promise,
    dismiss,
    dismissAll,
  };
};

export default useToast
 