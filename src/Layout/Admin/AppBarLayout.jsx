import { MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React from "react";

const AppBarLayout = ({
  drawerWidth,
  anchorEl,
  handleLogout,
  setAnchorEl,
  onDrawerToggle,
}) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: "100%",
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#FFFFFF",
        color: "#1E293B",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={onDrawerToggle}
          sx={{ mr: 2 }} // Visible en móvil y desktop
        >
          <MenuOutlined />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar sx={{ bgcolor: "#EC4899", width: 36, height: 36 }}>A</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarLayout;
