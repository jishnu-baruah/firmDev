import React from 'react';

const SubComponentSelect = ({ categoryName, components, onSelect }) => {
  return (
    <div>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">{`Select ${categoryName}`}</option>
        {components.map((component) => (
          <option key={component.id} value={component.id}>
            {component.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubComponentSelect;