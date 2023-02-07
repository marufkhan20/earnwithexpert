import React from "react";
import { FiHome } from "react-icons/fi";
import AdminLayout from "../../component/admin/AdminLayout";

const Admin = () => {
  return (
    <AdminLayout icon={<FiHome />} title={"Home"}>
      Hello
    </AdminLayout>
  );
};

export default Admin;
