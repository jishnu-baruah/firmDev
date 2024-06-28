// src/CategorySelect.js
import React from 'react';

const CategorySelect = ({ categories, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Category</option>
      {categories.map((category, index) => (
        <option key={index} value={category.category}>
          {category.category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
