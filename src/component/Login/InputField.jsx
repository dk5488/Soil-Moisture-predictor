import React from 'react';

const InputField = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="sr-only">{label}</label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  );
};

export default InputField;
