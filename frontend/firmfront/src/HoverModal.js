// HoverModal.js

import React from 'react';
import './HoverModal.css'; // Import CSS file for styling

const HoverModal = ({ isOpen, onClose, itemName, itemDetails, position }) => {
  if (!isOpen) return null;

  return (
    <div className="hover-modal" style={{ top: position.top, left: position.left }}>
      <div className="modal-content">
        <h3>{itemName}</h3>
        <p>{itemDetails}</p>
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default HoverModal;
