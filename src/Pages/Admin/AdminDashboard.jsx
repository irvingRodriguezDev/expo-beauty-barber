// src/pages/admin/AdminDashboardPage.jsx
import React from "react";
import {
  Grid,
  Typography,
  Box,
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
} from "@mui/material";
import { StatCard } from "../../components/admin/StatCard";
import {
  AttachMoney,
  ConfirmationNumber,
  EventSeat,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../Layout/Admin/AdminLayout";

export const AdminDashboard = () => {
  const navigate = useNavigate();

  // Datos mock temporalmente
  const recentSales = [
    {
      id: "ORD-001",
      event: "Expo Beauty CDMX 2026",
      seats: "A-12, A-13",
      total: "$3,000 MXN",
      status: "COMPLETADO",
    },
    {
      id: "ORD-002",
      event: "Ponencia Magistral",
      seats: "B-05",
      total: "$850 MXN",
      status: "PENDIENTE",
    },
  ];

  return (
    <AdminLayout>
      <Box>
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
              Resumen General
            </Typography>
            <Typography variant='body2' color='#64748B'>
              Métricas de venta e ingresos para Expos y Ponencias.
            </Typography>
          </Box>
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => navigate("/admin/eventos/nuevo")}
            sx={{
              backgroundColor: "#EC4899",
              hover: { backgroundColor: "#DB2777" },
              borderRadius: 2,
              px: 3,
            }}
          >
            Crear Evento
          </Button>
        </Box>

        {/* Métricas rápidas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title='Ingresos Totales'
              value='$145,200'
              subtitle='+12% este mes'
              icon={<AttachMoney fontSize='large' />}
              color='#10B981'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title='Boletos Vendidos'
              value='340'
              subtitle='De 500 disponibles'
              icon={<ConfirmationNumber fontSize='large' />}
              color='#EC4899'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title='Ocupación Promedio'
              value='68%'
              subtitle='En 3 eventos activos'
              icon={<EventSeat fontSize='large' />}
              color='#3B82F6'
            />
          </Grid>
        </Grid>

        {/* Tabla de Ventas Recientes */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, border: "1px solid #E2E8F0" }}
        >
          <CardContent>
            <Typography
              variant='h6'
              fontWeight='bold'
              color='#0F172A'
              sx={{ mb: 2 }}
            >
              Últimas Transacciones
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Orden</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Evento</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Asientos</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentSales.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell fontWeight={500}>{row.id}</TableCell>
                      <TableCell>{row.event}</TableCell>
                      <TableCell>{row.seats}</TableCell>
                      <TableCell fontWeight={600}>{row.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size='small'
                          color={
                            row.status === "COMPLETADO" ? "success" : "warning"
                          }
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
};
