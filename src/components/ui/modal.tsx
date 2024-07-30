import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-full md:w-1/2 lg:w-1/3">
        {children}
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
