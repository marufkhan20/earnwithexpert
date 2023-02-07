import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ icon, title, children }) => {
  return (
    <div className="flex justify-between">
      <div className="w-[15%] border-r-2 h-[94vh] border-br px-8">
        <Sidebar />
      </div>
      <div className="w-[85%] h-[94vh] bg-gray p-10">
        <div className="flex items-center gap-2 text-2xl">
          {icon}
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
