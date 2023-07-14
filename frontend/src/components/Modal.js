import React from "react";

const Modal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-75"></div>
            <div className="bg-white w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-lg z-10">
                <p className="mb-4">Are you sure want to delete this message?</p>

                <div className="flex justify-end space-x-3">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-1 rounded"
                        onClick={onDelete}>
                        Yes, I'm sure
                    </button>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;