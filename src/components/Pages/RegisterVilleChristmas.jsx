import React, { useState } from "react";
import pathEvents from "../../assets/images/LogoWapi-removebg-preview.png";
// Ajusta los nombres de archivo según como los guardes en tu proyecto:
import imgVillaArco from "../../assets/images/villa-arco.jpeg";
import imgVillaStand from "../../assets/images/villa-stand.jpeg";

import {
  Alert,
  Box,
  Chip,
  Container,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  AutoAwesome,
  CalendarMonth,
  LocationOn,
  AccessTime,
  AcUnit,
} from "@mui/icons-material";
import SectionRigth from "./SectionRigth";
import SectionLeft from "./SectionLeft";
import PreviewModal from "./PreviewModal";

// Paleta alineada exactamente con los renders de la Villa Navideña Wapizima
const BRAND_COLORS = {
  primary: "#E53888", // Magenta vibrante Wapizima
  primaryDark: "#C8236E",
  softPink: "#FFD9E2", // Rosa pastel
  blushBg: "#FFF5F8", // Fondo nieve rosado muy luminoso
  gold: "#D4AF37", // Acento dorado de los marcos y moños
  goldSoft: "#FFF8E7",
  textMain: "#4A2536", // Vino cálido profundo (reemplaza el negro)
  textMuted: "#7D5266",
};

const REFERENCE_GALLERY = [
  {
    id: "arco-villa",
    image: imgVillaArco,
    badge: "Entrada Principal",
    title: "Christmas Nails • Villa Navideña",
    description:
      "Recorre los 12 pabellones temáticos de Wapizima y Carolina Tavera en Expo Reforma.",
  },
  {
    id: "stand-distribuidor",
    image: imgVillaStand,
    badge: "Experiencia & Productos",
    title: "Stands de Distribuidores Autorizados",
    description:
      "Asesoría personalizada, lanzamientos de temporada, promociones exclusivas y spots navideños.",
  },
];

const RegisterVilleChristmas = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Manejo de inputs con limpieza de teléfono a 10 dígitos
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: numericValue }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validación del formulario
  const validate = () => {
    const newErrors = { fullName: "", phone: "" };
    let isValid = true;

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Por favor ingresa tu nombre completo.";
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Ingresa un número de teléfono válido a 10 dígitos.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Petición a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Reemplaza la URL por tu endpoint real (o variable de entorno import.meta.env.VITE_API_URL)
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${API_URL}/registrar-villa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: 16,
          buyerName: formData.fullName.trim(),
          buyerPhone: formData.phone,
          total: 0,
          status: "completo_gratis",
          folio_venta: null,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "No se pudo completar tu registro. Intenta nuevamente.",
        );
      }

      setRegisteredUser({
        fullName: formData.fullName.trim(),
        phone: formData.phone,
        folio:
          data.folio || `WAPI-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      setSnackbar({
        open: true,
        message: "¡Registro confirmado! Te esperamos en la Villa Navideña.",
        severity: "success",
      });

      setFormData({ fullName: "", phone: "" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Error de conexión con el servidor.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        background: `radial-gradient(circle at top left, #FFE4EC 0%, ${BRAND_COLORS.blushBg} 45%, #FFFFFF 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Destellos decorativos navideños en tonos pastel */}
      <AcUnit
        sx={{
          position: "absolute",
          top: 24,
          left: "6%",
          fontSize: 42,
          color: BRAND_COLORS.softPink,
          opacity: 0.85,
        }}
      />
      <AcUnit
        sx={{
          position: "absolute",
          top: 90,
          right: "8%",
          fontSize: 34,
          color: BRAND_COLORS.gold,
          opacity: 0.35,
        }}
      />

      <Container maxWidth='lg'>
        {/* Encabezado Institucional Wapizima */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            component='img'
            src={pathEvents}
            alt='Logo Wapizima'
            sx={{
              height: { xs: 72, md: 90 },
              width: "auto",
              mb: 1.5,
              filter: "drop-shadow(0px 4px 12px rgba(229, 56, 136, 0.2))",
            }}
          />
        </Box>

        {/* Sección Principal: Galería de Referencia + Formulario */}
        <Grid container spacing={4} alignItems='stretch'>
          {/* Columna Derecha: Tarjeta de Registro */}
          <SectionRigth
            BRAND_COLORS={BRAND_COLORS}
            registeredUser={registeredUser}
            setRegisteredUser={setRegisteredUser}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            errors={errors}
            loading={loading}
          />
          {/* Columna Izquierda: Imágenes de referencia de la Villa Navideña */}
          <SectionLeft
            REFERENCE_GALLERY={REFERENCE_GALLERY}
            setSelectedPreview={setSelectedPreview}
            BRAND_COLORS={BRAND_COLORS}
          />
        </Grid>
      </Container>

      {/* Modal para ampliar las imágenes de referencia */}
      <PreviewModal
        BRAND_COLORS={BRAND_COLORS}
        selectedPreview={selectedPreview}
        setSelectedPreview={setSelectedPreview}
      />
      {/* Notificación Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            borderRadius: "12px",
            backgroundColor:
              snackbar.severity === "success"
                ? BRAND_COLORS.primary
                : undefined,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterVilleChristmas;
