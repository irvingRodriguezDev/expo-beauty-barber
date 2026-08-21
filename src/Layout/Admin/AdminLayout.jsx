import React from "react";
import DrawerAppBar from "./NavBar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <DrawerAppBar children={children} />
    </div>
  );
};

export default AdminLayout;
