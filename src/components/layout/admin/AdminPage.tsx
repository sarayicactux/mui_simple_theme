import React from "react";
import AdminLayout from "./AdminLayout";

const AdminPage = (props) => {
  return <AdminLayout>{props.children}</AdminLayout>;
};
export default AdminPage;
