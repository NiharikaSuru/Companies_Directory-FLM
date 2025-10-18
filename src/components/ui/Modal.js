import React from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizeClasses = {
    sm: 'max-w-xs sm:max-w-sm',
    md: 'max-w-sm sm:max-w-md',
    lg: 'max-w-md sm:max-w-lg',
    xl: 'max-w-lg sm:max-w-2xl'
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden ${sizeClasses[size]}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button
            type="button"
            className="bg-transparent text-gray-500 hover:text-gray-700 rounded p-1"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="flex flex-col h-full max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]">
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
