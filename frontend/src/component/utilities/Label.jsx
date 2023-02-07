import React from "react";

const Label = ({ children, htmlFor, none }) => {
  return (
    <label
      className={`text-secondary text-xl font-bold ${
        !none && "mb-3"
      } inline-block`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
