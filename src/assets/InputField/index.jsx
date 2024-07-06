// InputField.js
import React from 'react';

const InputField = ({ id, label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
