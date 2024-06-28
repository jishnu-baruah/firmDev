// src/SubComponentSelect.js
import React from 'react';

const SubComponentSelect = ({ components, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Component</option>
      {components.map((component) => (
        <option key={component.id} value={component.id}>
          {component.name}
        </option>
      ))}
    </select>
  );
};

export default SubComponentSelect;

