import React from 'react';
import './UserModal.css'; // Optional: Create a CSS file for modal styling

const UserModal = ({ isOpen, onClose, children }) => {
    console.log('UserModal onClose prop:', onClose); // Log the onClose prop
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default UserModal;
