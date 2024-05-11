import React from "react";

function LoginInput({ onChange, value, placeholder, id, children = null, ...props }) {
  return (
    <label className="position-relative" htmlFor={id} id={`${id}-label`}>
      <input
        className="rounded p-2  "
        id={id}
        placeholder={placeholder}
        aria-label={placeholder}
        name={id}
        value={value}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  );
}

export default LoginInput;
