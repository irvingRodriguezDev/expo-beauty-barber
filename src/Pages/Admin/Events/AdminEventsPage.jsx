// src/pages/admin/AdminEventsPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Add,
  EventSeatOutlined,
  EditOutlined,
  VisibilityOutlined,
  CalendarToday,
  LocationOn,
} from "@mui/icons-material";
import { AdminLayout } from "../../../Layout/Admin/AdminLayout";

// Datos Mock Iniciales
const initialEvents = [
  {
    id: "expo-cdmx-2026",
    title: "Expo Beauty Business CDMX 2026",
    location: "Centro Citibanamex, CDMX",
    date: "2026-11-15",
    status: "ACTIVE",
    totalSeats: 450,
    soldSeats: 280,
    priceRange: "$850 - $2,500 MXN",
  },
  {
    id: "ponencia-magistral-master",
    title: "Ponencia Magistral: Colorimetría Avanzada",
    location: "Auditorio Principal, CDMX",
    date: "2026-11-16",
    status: "ACTIVE",
    totalSeats: 120,
    soldSeats: 95,
    priceRange: "$1,800 - $3,000 MXN",
  },
  {
    id: "expo-gdl-2025",
    title: "Expo Beauty Business Guadalajara",
    location: "Expo Guadalajara",
    date: "2025-05-10",
    status: "COMPLETED",
    totalSeats: 300,
    soldSeats: 300,
    priceRange: "$750 - $2,000 MXN",
  },
];
const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(initialEvents);
  const [openModal, setOpenModal] = useState(false);

  // Estado del formulario para crear un nuevo evento
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    date: "",
    status: "ACTIVE",
    bannerUrl: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Generar slug automático al escribir el título
      if (name === "title") {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }
      return updated;
    });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: formData.slug || `event-${Date.now()}`,
      title: formData.title,
      location: formData.location,
      date: formData.date,
      status: formData.status,
      totalSeats: 0,
      soldSeats: 0,
      priceRange: "$0 MXN",
    };

    setEvents([newEvent, ...events]);
    setOpenModal(false);
    setFormData({
      title: "",
      slug: "",
      location: "",
      date: "",
      status: "ACTIVE",
      bannerUrl: "",
      description: "",
    });
  };

  return (
    <AdminLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ p: 2, mb: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box>
              <Typography variant='h4' fontWeight='bold' color='#0F172A'>
                Expos y Ponencias
              </Typography>
              <Typography variant='body2' color='#64748B'>
                Administra los eventos de belleza y diseña su distribución de
                asientos.
              </Typography>
            </Box>
            <Link to={"/admin/eventos/nuevo"}>
              <Button
                variant='contained'
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#EC4899",
                  fontWeight: "bold",
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  ":hover": { backgroundColor: "#DB2777" },
                }}
              >
                Nuevo Evento
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }}>
          <Card
            elevation={0}
            sx={{ borderRadius: 3, border: "1px solid #E2E8F0" }}
          >
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Evento / Ponencia
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Ubicación y Fecha
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Venta / Boletos
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                      <TableCell align='right' sx={{ fontWeight: 600 }}>
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event) => {
                      const percentage =
                        event.totalSeats > 0
                          ? Math.round(
                              (event.soldSeats / event.totalSeats) * 100
                            )
                          : 0;
                      return (
                        <TableRow key={event.id} hover>
                          {/* Título y Slug */}
                          <TableCell>
                            <Typography fontWeight={600} color='#0F172A'>
                              {event.title}
                            </Typography>
                            <Typography variant='caption' color='#94A3B8'>
                              Slug: /{event.id}
                            </Typography>
                          </TableCell>

                          {/* Ubicación y Fecha */}
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <LocationOn
                                  sx={{ fontSize: 16, color: "#64748B" }}
                                />
                                <Typography variant='body2' color='#334155'>
                                  {event.location}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CalendarToday
                                  sx={{ fontSize: 14, color: "#64748B" }}
                                />
                                <Typography variant='caption' color='#64748B'>
                                  {event.date}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          {/* Ocupación de Asientos */}
                          <TableCell>
                            <Typography
                              variant='body2'
                              fontWeight={600}
                              color='#0F172A'
                            >
                              {event.soldSeats} / {event.totalSeats} vendida(s)
                            </Typography>
                            <Typography
                              variant='caption'
                              color='#10B981'
                              fontWeight={500}
                            >
                              {percentage}% ocupado ({event.priceRange})
                            </Typography>
                          </TableCell>

                          {/* Estado */}
                          <TableCell>
                            <Chip
                              label={
                                event.status === "ACTIVE"
                                  ? "ACTIVO"
                                  : "FINALIZADO"
                              }
                              size='small'
                              color={
                                event.status === "ACTIVE"
                                  ? "success"
                                  : "default"
                              }
                              sx={{ fontWeight: 600, fontSize: 11 }}
                            />
                          </TableCell>

                          {/* Acciones */}
                          <TableCell align='right'>
                            <Stack
                              direction='row'
                              spacing={1}
                              justifyContent='flex-end'
                            >
                              <Tooltip title='Diseñar Mapa de Asientos (Konva)'>
                                <Button
                                  variant='outlined'
                                  size='small'
                                  startIcon={<EventSeatOutlined />}
                                  onClick={() =>
                                    navigate(`/admin/eventos/${event.id}/mapa`)
                                  }
                                  sx={{
                                    color: "#EC4899",
                                    borderColor: "#FBCFE8",
                                    ":hover": {
                                      borderColor: "#EC4899",
                                      backgroundColor: "#FDF2F8",
                                    },
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                  }}
                                >
                                  Mapa Konva
                                </Button>
                              </Tooltip>

                              <Tooltip title='Ver Landing Pública'>
                                <IconButton
                                  size='small'
                                  onClick={() =>
                                    window.open(`/evento/${event.id}`, "_blank")
                                  }
                                  sx={{ color: "#64748B" }}
                                >
                                  <VisibilityOutlined fontSize='small' />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title='Editar Info'>
                                <IconButton
                                  size='small'
                                  sx={{ color: "#64748B" }}
                                >
                                  <EditOutlined fontSize='small' />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminEventsPage;
