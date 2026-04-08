"use client";
import React from 'react';
import useToastStore from '../../../../store/toast.store';

const Toast = () => {

    const { toasts, removeToast } = useToastStore();

    const getToastStyles = (type) => {



        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-500',
                    text: 'text-green-500',
                    icon: '✅',
                    iconBg: 'bg-green-100',
                };
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-500',
                    text: 'text-red-800',
                    icon: '❌',
                    iconBg: 'bg-red-100',
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-500',
                    text: 'text-yellow-800',
                    icon: '⚠️',
                    iconBg: 'bg-yellow-100',
                };

            case 'info':
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-500',
                    text: 'text-blue-800',
                    icon: 'ℹ️',
                    iconBg: 'bg-blue-100',
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-500',
                    text: 'text-gray-800',
                    icon: '📢',
                    iconBg: 'bg-gray-100',
                };
        }
    }

    if(toasts.length === 0) return null;
    return (
        <div  className="fixed top-4 right-4 z-50 space-y-2">
{toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`${styles.bg} ${styles.border} border-l-4 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md transform transition-all duration-300 ease-in-out animate-slide-in`}
            role="alert"
          >
            <div className="flex items-start">
              <div className={`${styles.iconBg} rounded-full p-2 mr-3`}>
                <span className="text-lg">{styles.icon}</span>
              </div>
              <div className="flex-1">
                <p className={`${styles.text} text-sm font-medium`}>
                  {toast.message}
                </p>
                {toast.type === 'loading' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-1.5 rounded-full animate-progress"></div>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
        </div>
    )
}

export default Toast
