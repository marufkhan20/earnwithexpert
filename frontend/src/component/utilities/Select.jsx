import React from "react";

const Select = ({ children, ...rest }) => {
  return (
    <select
      className="w-full block text-[#212529] placeholder:text-[#71767a] text-lg px-3 py-2 border border-[#ced4da] rounded-md focus:outline-none focus:ring-1"
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
