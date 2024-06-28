// src/EditPopup.js
import React from 'react';
import './EditPopup.css';

const EditPopup = ({ item, properties, setProperties, onClose, onSave }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperties({ ...properties, [name]: value });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <h3>Edit {item}</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={properties.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Pin Number:
          <input
            type="text"
            name="pin"
            value={properties.pin}
            onChange={handleChange}
          />
        </label>
        <label>
          VCC:
          <input
            type="text"
            name="vcc"
            value={properties.vcc}
            onChange={handleChange}
          />
        </label>
        <label>
          GND:
          <input
            type="text"
            name="gnd"
            value={properties.gnd}
            onChange={handleChange}
          />
        </label>
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPopup;
