// ComponentDetailsModal.js

import React from 'react';
import Modal from './Modal';

const ComponentDetailsModal = ({ isOpen, onClose, component }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h2>{component?.name}</h2>
        <p>Pins: {component?.pin}</p>
        <p>VCC: {component?.vcc}</p>
        <p>GND: {component?.gnd}</p>
      </div>
    </Modal>
  );
};

export default ComponentDetailsModal;
