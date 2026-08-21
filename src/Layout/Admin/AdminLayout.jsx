// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  DashboardOutlined,
  EventOutlined,
  AirlineSeatReclineExtraOutlined,
  QrCodeScannerOutlined,
  LogoutOutlined,
  MenuOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import AppBarLayout from "./AppBarLayout";
import DrawerLayout from "./DrawerLayout";

const drawerWidth = 260;

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/admin/dashboard",
    },
    {
      text: "Expos y Ponencias",
      icon: <EventOutlined />,
      path: "/admin/eventos",
    },
    {
      text: "Validar QR",
      icon: <QrCodeScannerOutlined />,
      path: "/admin/validar-qr",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Typography variant='h6' fontWeight='bold' color='#EC4899'>
          Expo Beauty Admin
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "#1E293B" }} />
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: active ? "#EC4899" : "transparent",
                  color: active ? "#FFFFFF" : "#94A3B8",
                  "&:hover": {
                    backgroundColor: active ? "#DB2777" : "#1E293B",
                    color: "#FFFFFF",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: active ? "#FFFFFF" : "#94A3B8", minWidth: 40 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: active ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "#1E293B" }} />
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "#EF4444",
            "&:hover": { backgroundColor: "#450A0A" },
          }}
        >
          <ListItemIcon sx={{ color: "#EF4444", minWidth: 40 }}>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary='Cerrar Sesión' />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC" }}
    >
      {/* Navbar Superior */}
      <AppBarLayout
        drawerWidth={drawerWidth}
        drawerContent={drawerContent}
        anchorEl={anchorEl}
        mobileOpen={mobileOpen}
        setAnchorEl={setAnchorEl}
      />
      {/* Drawer Lateral / Sidebar */}
      <DrawerLayout
        drawerContent={drawerContent}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* Área Principal donde se renderizan las sub-rutas */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
