import AdminLayout from "@/src/components/layout/admin";
import React, { ReactElement } from "react";

type Props = {};

const Admin = (props: Props) => {
  return <div>Admin</div>;
};

export default Admin;

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout title="Quản trị viên">{page}</AdminLayout>;
};
