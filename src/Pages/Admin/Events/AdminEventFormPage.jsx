// src/pages/admin/AdminEventFormPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  MenuItem,
  Stack,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  SaveOutlined,
  CloudUploadOutlined,
  EventOutlined,
  AttachMoney,
  LocationOnOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { AdminLayout } from "../../../Layout/Admin/AdminLayout";

const EVENT_TYPES = [
  { value: "PONENCIA", label: "Ponencia Magistral" },
  { value: "TALLER", label: "Taller Práctico / Workshop" },
  { value: "EXPO", label: "Expo General" },
  { value: "CONCURSO", label: "Concurso / Campeonato" },
];

export const AdminEventFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Estado del Formulario
  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    type: "PONENCIA",
    description: "",
    date: "",
    time: "",
    locationName: "Centro de Convenciones - Toluca",
    address: "Av. Miguel Hidalgo Ote. 500, Centro",
    basePrice: "",
    totalCapacity: 100,
    isActive: true,
    coverImageUrl: "",
  });

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (isEditing) {
      // Ejemplo: Cargar de DynamoDB / API
      setFormData({
        title: "Masterclass de Colorimetría Avanzada",
        speaker: "Alejandro Salinas",
        type: "PONENCIA",
        description:
          "Aprende técnicas modernas de balayage, decoloración sin daño y formulación de matices.",
        date: "2026-10-15",
        time: "10:00",
        locationName: "Salón Principal Expo Beauty",
        address: "Toluca, Estado de México",
        basePrice: 850,
        totalCapacity: 250,
        isActive: true,
        coverImageUrl:
          "https://via.placeholder.com/600x300?text=Masterclass+Colorimetria",
      });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando evento en backend:", formData);
    // Aquí ejecutas la mutación o llamada a AWS Lambda / DynamoDB
    alert(
      isEditing ? "Evento actualizado con éxito" : "Evento creado con éxito"
    );
    navigate("/admin/eventos");
  };

  return (
    <AdminLayout>
      <Grid container spacing={2}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ width: "100%", mx: "auto", pb: 6 }}
        >
          <Grid item xs={12} sx={{ p: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Stack direction='row' spacing={2} alignItems='center'>
                <IconButton
                  onClick={() => navigate("/admin/eventos")}
                  sx={{ color: "#64748B" }}
                >
                  <ArrowBack />
                </IconButton>
                <Box>
                  <Typography variant='h6' fontWeight='bold' color='#0F172A'>
                    {isEditing
                      ? "Editar Evento / Ponencia"
                      : "Crear Nuevo Evento"}
                  </Typography>
                  <Typography variant='caption' color='#64748B'>
                    {isEditing
                      ? `ID: ${id}`
                      : "Completa la información básica y precios"}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction='row' spacing={2} alignItems='center'>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={handleChange}
                      name='isActive'
                      color='success'
                    />
                  }
                  label={
                    <Typography
                      variant='body2'
                      fontWeight='600'
                      color={formData.isActive ? "#10B981" : "#64748B"}
                    >
                      {formData.isActive
                        ? "Publicado / Activo"
                        : "Borrador / Oculto"}
                    </Typography>
                  }
                />
                <Button
                  type='submit'
                  variant='contained'
                  startIcon={<SaveOutlined />}
                  sx={{
                    backgroundColor: "#EC4899",
                    fontWeight: "bold",
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    ":hover": { backgroundColor: "#DB2777" },
                  }}
                >
                  {isEditing ? "Actualizar Evento" : "Guardar Evento"}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7} lg={8}>
                <Card
                  elevation={0}
                  sx={{ border: "1px solid #E2E8F0", borderRadius: 3, mb: 3 }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                      color='#0F172A'
                      mb={2}
                    >
                      Detalles del Evento
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          label='Título de la Ponencia / Expo'
                          name='title'
                          value={formData.title}
                          onChange={handleChange}
                          placeholder='Ej. Masterclass de Microblading & Lips'
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          label='Ponente / Instructor'
                          name='speaker'
                          value={formData.speaker}
                          onChange={handleChange}
                          placeholder='Ej. Alejandro Salinas'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <PersonOutlined sx={{ color: "#94A3B8" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label='Tipo de Evento'
                          name='type'
                          value={formData.type}
                          onChange={handleChange}
                        >
                          {EVENT_TYPES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label='Descripción General'
                          name='description'
                          value={formData.description}
                          onChange={handleChange}
                          placeholder='Escribe el temario, lo que incluye el boleto, requisitos, etc.'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Ubicación y Sede */}
                <Card
                  elevation={0}
                  sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant='subtitle1'
                      fontWeight='bold'
                      color='#0F172A'
                      mb={2}
                    >
                      Ubicación del Recinto
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Lugar / Recinto'
                          name='locationName'
                          value={formData.locationName}
                          onChange={handleChange}
                          placeholder='Ej. Hotel Fiesta Inn Toluca'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <LocationOnOutlined sx={{ color: "#94A3B8" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Dirección Completa'
                          name='address'
                          value={formData.address}
                          onChange={handleChange}
                          placeholder='Ej. Av. Paseo Tollocan 123, Col. Centro'
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              {/* COLUMNA DERECHA: Fecha, Precios e Imagen */}
              <Grid item xs={12} md={5} lg={4}>
                <Stack spacing={3}>
                  {/* Fechas y Horarios */}
                  <Card
                    elevation={0}
                    sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        color='#0F172A'
                        mb={2}
                      >
                        Programación
                      </Typography>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          required
                          type='date'
                          label='Fecha del Evento'
                          name='date'
                          value={formData.date}
                          onChange={handleChange}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <EventOutlined sx={{ color: "#94A3B8" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          fullWidth
                          required
                          type='time'
                          label='Hora de Inicio'
                          name='time'
                          value={formData.time}
                          onChange={handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Capacidad y Precios */}
                  <Card
                    elevation={0}
                    sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        color='#0F172A'
                        mb={2}
                      >
                        Capacidad y Precios
                      </Typography>
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          required
                          type='number'
                          label='Precio Base General ($ MXN)'
                          name='basePrice'
                          value={formData.basePrice}
                          onChange={handleChange}
                          placeholder='850'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <AttachMoney sx={{ color: "#94A3B8" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          fullWidth
                          type='number'
                          label='Aforo Máximo (Asientos)'
                          name='totalCapacity'
                          value={formData.totalCapacity}
                          onChange={handleChange}
                          placeholder='100'
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Banner / Imagen de Portada */}
                  <Card
                    elevation={0}
                    sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        color='#0F172A'
                        mb={2}
                      >
                        Imagen de Portada
                      </Typography>
                      {formData.coverImageUrl ? (
                        <Box
                          sx={{
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            mb: 2,
                          }}
                        >
                          <Box
                            component='img'
                            src={formData.coverImageUrl}
                            alt='Portada'
                            sx={{
                              width: "100%",
                              height: 160,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                          <Button
                            size='small'
                            color='error'
                            variant='contained'
                            onClick={() =>
                              setFormData({ ...formData, coverImageUrl: "" })
                            }
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              textTransform: "none",
                            }}
                          >
                            Quitar
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            border: "2px dashed #CBD5E1",
                            borderRadius: 2,
                            p: 3,
                            textAlign: "center",
                            backgroundColor: "#F8FAFC",
                            cursor: "pointer",
                            ":hover": {
                              borderColor: "#EC4899",
                              backgroundColor: "#FDF2F8",
                            },
                          }}
                        >
                          <CloudUploadOutlined
                            sx={{ fontSize: 40, color: "#94A3B8", mb: 1 }}
                          />
                          <Typography
                            variant='body2'
                            fontWeight='600'
                            color='#334155'
                          >
                            Haz clic para subir la imagen de portada
                          </Typography>
                          <Typography variant='caption' color='#94A3B8'>
                            PNG, JPG o WEBP (Recomendado 1200x600px)
                          </Typography>
                        </Box>
                      )}
                      <TextField
                        fullWidth
                        size='small'
                        sx={{ mt: 2 }}
                        label='o pega la URL de la imagen (S3)'
                        name='coverImageUrl'
                        value={formData.coverImageUrl}
                        onChange={handleChange}
                      />
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </AdminLayout>
  );
};
