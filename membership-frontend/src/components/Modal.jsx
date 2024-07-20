import { React } from "react";

const Modal = ({ onClose, modalMessage, modalIcon }) => {
  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center z-50 pt-10">
        <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        <div className="relative bg-white rounded-lg top-0 shadow-lg p-6 w-full max-w-md mx-4 z-10">
          <div className="flex flex-col h-full">
            <span className="py-[0.5rem]">{modalIcon}</span>
            <p>{modalMessage}</p>
            <div className="mt-auto flex justify-end">
              <button
                className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-700"
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
