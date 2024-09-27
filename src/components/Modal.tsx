import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-[70%] lg:w-[40%]">
        <button onClick={onClose} className="absolute  text-black w-7 h-7">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
