import { Box, Drawer } from "@mui/material";
import React from "react";

const DrawerLayout = ({
  drawerContent,
  drawerWidth,
  mobileOpen,
  setMobileOpen,
}) => {
  return (
    <Drawer
      variant='temporary'
      open={mobileOpen}
      onClose={() => setMobileOpen(false)}
      ModalProps={{ keepMounted: true }} // Optimización de renderizado
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          borderRight: "none",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default DrawerLayout;
