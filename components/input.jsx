import React from "react";

function InputField({type = "text", name, value, handleChange, placeholder}) {
  return (
    <input
      type={type}
      className="block border border-grey-light w-full p-3 rounded mb-4"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default InputField;
