
import { create } from "zustand";

let toastId = 0;

const useToastStore = create((set, get) => ({
    toasts: [],

    addToast: (message, type = 'info', duration = 3000) => {
        const id = toastId++ ;
        const newToast = {
            id, 
            message,
            type,
            duration,
            createAt: Date.now(),
        };

        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));

        if(duration !== null){
            setTimeout(() => {
                get().removeToast(id);
            }, duration);
        }

        return id;
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },

    removeAllToasts: () => {
        set({toasts: []});
    },

    updateToast: (id, message, type) => {
        set((state) => ({
            toasts: state.toasts.map((toast) =>
            toast.id === id ? {...toast, message , type} : toast
        ),
        }));
    },


    // Success toast
    success: (message, duration = 3000) => {
        return get().addToast(message, 'success', duration);
    },

    error: (message, duration = 4000) => {
        return get().addToast(message , 'error', duration);
    },

    warning: (message, duration = 3000) => {
        return get().addToast(message, 'warning', duration);
    },

    info: (message , duration  = 3000) => {
        return get().addToast(message, 'info', duration);
    },

    loading: (message) =>{
        return get().addToast(message, 'loading', null);
    },

    dismiss: (id) =>{
        get().removeToast(id);
    },

    dismissAll: () =>{
        get().removeAllToasts();
    },
}));


export default useToastStore;