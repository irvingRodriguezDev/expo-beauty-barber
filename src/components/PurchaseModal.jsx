import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  Divider,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import { MethodPost } from "../config/service";
import Swal from "sweetalert2";
import { PrivacyPolicyModal } from "./sections/PrivacyPolicyModal";

export default function PurchaseModal({
  open,
  onClose,
  evento,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  // Estados del Formulario
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    cantidad_boletos: 1,
  });

  // Resetear el formulario cada vez que se abre con un evento nuevo
  useEffect(() => {
    if (open) {
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        cantidad_boletos: 1,
      });
    }
  }, [open, evento]);

  if (!evento) return null;
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejadores del contador de boletos
  const handleIncrement = () => {
    setFormData((prev) => ({
      ...prev,
      cantidad_boletos: Number(prev.cantidad_boletos) + 1,
    }));
  };

  const handleDecrement = () => {
    if (formData.cantidad_boletos > 1) {
      setFormData((prev) => ({
        ...prev,
        cantidad_boletos: Number(prev.cantidad_boletos) - 1,
      }));
    }
    4;
  };
  const handleConfirmPurchase = async (payload) => {
    // 1. Mostramos un modal de carga inmediato para congelar la pantalla y evitar clics dobles
    onClose();
    Swal.fire({
      title: "Procesando tu solicitud...",
      text: "Te estamos redireccionando a la pasarela de pago seguro.",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner nativo de SweetAlert
      },
    });

    try {
      let url = "/reservar";
      // 2. Realizamos la petición POST a tu API Gateway
      const res = await MethodPost(url, payload);

      if (res.data && res.data.stripeUrl) {
        // 3. ¡CORRECCIÓN CRÍTICA! Redirección correcta usando .href
        window.location.href = res.data.stripeUrl;
      } else {
        // Si la API responde pero no trae URL (por ejemplo, error controlado del backend)
        Swal.fire({
          title: "Ha habido un problema",
          text:
            res.data.message ||
            "Ocurrió un problema al generar el link de pago.",
          icon: "error",
          timer: 3500,
          showConfirmButton: true, // Mejor dejamos que el usuario lo cierre para que lea bien el error
          confirmButtonColor: "#3D2B2F",
        });
      }
    } catch (error) {
      // 4. Captura de errores de red o caídas del servidor AWS
      console.error("Ocurrió un error en el checkout:", error);

      Swal.fire({
        title: "Error de conexión",
        text: "No pudimos comunicarnos con el servidor. Por favor, verifica tu conexión e intenta de nuevo.",
        icon: "error",
        timer: 3500,
        showConfirmButton: true,
        confirmButtonColor: "#3D2B2F",
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Payload estructurado listo para tu Backend en AWS
    const payload = {
      eventId: evento.id, // ID oculto requerido
      evento: evento.titulo,
      buyerName: formData.nombre,
      buyerEmail: formData.correo,
      buyerPhone: formData.telefono,
      cantidadBoletos: Number(formData.cantidad_boletos),
      total: formData.cantidad_boletos * evento.costo,
    };
    handleConfirmPurchase(payload);
  };

  const totalPago = Number(formData.cantidad_boletos) * Number(evento.costo);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      scroll='body'
      PaperProps={{
        sx: {
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 50px rgba(61, 43, 47, 0.15)",
          border: "1px solid rgba(238, 111, 151, 0.2)",
          overflow: "hidden",
        },
      }}
    >
      {/* Botón de cerrar superior */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "rgba(61, 43, 47, 0.4)",
          "&:hover": { color: deepText, bgcolor: "rgba(61,43,47,0.04)" },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Animación de entrada de contenido */}
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box component='form' onSubmit={handleSubmit}>
          {/* ENCABEZADO: Resumen del Evento Seleccionado */}
          <Box sx={{ mb: 3, pr: 4 }}>
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                fontWeight: 800,
                color: brandPink,
                letterSpacing: "0.05em",
              }}
            >
              Estás adquiriendo accesos para:
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 900,
                color: deepText,
                lineHeight: 1.2,
                mt: 0.5,
              }}
            >
              {evento.titulo}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: "rgba(61, 43, 47, 0.6)",
                fontWeight: 600,
                display: "block",
                mt: 0.5,
              }}
            >
              {evento.lugar} • {FormatDate(evento.fecha)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "rgba(238, 111, 151, 0.12)" }} />

          {/* FORMULARIO DE CAPTURA */}
          <Stack spacing={2.5}>
            {/* Input Nombre */}
            <TextField
              required
              fullWidth
              label='Nombre Completo'
              name='nombre'
              value={formData.nombre}
              onChange={handleChange}
              variant='outlined'
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonIcon sx={{ color: "rgba(61, 43, 47, 0.3)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            {/* Input Correo */}
            <TextField
              required
              fullWidth
              type='email'
              label='Correo Electrónico'
              name='correo'
              value={formData.correo}
              onChange={handleChange}
              variant='outlined'
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon sx={{ color: "rgba(61, 43, 47, 0.3)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            {/* Input Teléfono (WhatsApp) */}
            <TextField
              required
              fullWidth
              type='tel'
              label='Número de WhatsApp (10 dígitos)'
              name='telefono'
              value={formData.telefono}
              onChange={handleChange}
              variant='outlined'
              placeholder='Ej. 5512345678'
              autoComplete='off'
              inputProps={{ pattern: "[0-9]{10}" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <WhatsAppIcon sx={{ color: "rgba(61, 43, 47, 0.3)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
            />

            {/* CONTADOR DE BOLETOS PREMIUM */}
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: "rgba(61, 43, 47, 0.03)",
                border: "1px solid rgba(61, 43, 47, 0.05)",
              }}
            >
              <Box>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 800, color: deepText }}
                >
                  Cantidad de Accesos
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ color: "rgba(61, 43, 47, 0.5)", fontWeight: 600 }}
                >
                  {formatMexicanCurrency(Number(evento.costo) || 0)} MXN c/u
                </Typography>
                <br />
                <Typography
                  variant='caption'
                  sx={{ color: "rgba(61, 43, 47, 0.5)", fontWeight: 800 }}
                >
                  hasta 10 boletos por transacción
                </Typography>
              </Box>

              <Stack direction='row' spacing={1.5} alignItems='center'>
                <IconButton
                  onClick={handleDecrement}
                  disabled={formData.cantidad_boletos <= 1}
                  sx={{
                    bgcolor: "#FFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    p: 0.8,
                  }}
                >
                  <RemoveIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>

                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 900,
                    minWidth: "20px",
                    textAlign: "center",
                    color: deepText,
                  }}
                >
                  {formData.cantidad_boletos}
                </Typography>

                <IconButton
                  onClick={handleIncrement}
                  disabled={formData.cantidad_boletos === 10}
                  sx={{
                    bgcolor: "#FFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    p: 0.8,
                  }}
                >
                  <AddIcon sx={{ fontSize: "1.1rem" }} />
                </IconButton>
              </Stack>
            </Box>
          </Stack>

          {/* RESUMEN DE PAGO TOTAL */}
          <Box
            sx={{
              mt: 3,
              mb: 3,
              p: 2,
              borderRadius: "14px",
              border: `1px dashed ${brandPink}50`,
              bgcolor: `${brandPink}03`,
            }}
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography
                variant='body2'
                sx={{ fontWeight: 700, color: "rgba(61, 43, 47, 0.6)" }}
              >
                Total a pagar:
              </Typography>
              <Typography
                variant='h5'
                sx={{ fontWeight: 900, color: deepText }}
              >
                {formatMexicanCurrency(Number(totalPago))}{" "}
                <Box
                  component='span'
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "rgba(61, 43, 47, 0.4)",
                  }}
                >
                  MXN
                </Box>
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3,
              px: 2,
            }}
          >
            <Stack
              direction='row'
              alignItems='flex-start'
              spacing={1}
              sx={{ maxWidth: "420px" }}
            >
              <Checkbox
                checked={aceptaPoliticas}
                onChange={(e) => setAceptaPoliticas(e.target.checked)}
                size='small'
                sx={{
                  color: "rgba(61, 43, 47, 0.4)",
                  padding: "2px", // Compacto para que no desfase el texto
                  "&.Mui-checked": {
                    color: "#E53888", // El rosa vibrante de Wapizima
                  },
                }}
              />
              <Typography
                variant='caption'
                sx={{
                  color: "rgba(61, 43, 47, 0.7)",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textAlign: "left",
                  userSelect: "none", // Evita que se seleccione el texto al dar clic rápido
                }}
              >
                Al realizar la compra, confirmo que soy mayor de edad y acepto
                de conformidad la{" "}
                <span
                  onClick={() => setOpenPolicyModal(true)} // Aquí disparas la función que abre tu modal de privacidad
                  style={{
                    color: "#E53888",
                    fontWeight: 800,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  política de privacidad
                </span>{" "}
                de la plataforma.
              </Typography>
            </Stack>
          </Box>
          {/* BOTÓN SUBMIT COMPRA */}
          <Button
            type='submit'
            variant='contained'
            fullWidth
            startIcon={<ConfirmationNumberIcon />}
            disabled={!aceptaPoliticas}
            sx={{
              bgcolor: brandPink,
              color: "#FFF",
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "1rem",
              py: 1.8,
              textTransform: "none",
              boxShadow: `0 8px 24px rgba(238, 111, 151, 0.3)`,
              "&:hover": {
                bgcolor: brandPink,
                color: "#ffff",
                boxShadow: "0 8px 24px rgba(61, 43, 47, 0.2)",
              },
              transition: "all 0.3s",
            }}
          >
            Proceder al Pago Seguro
          </Button>
        </Box>
      </DialogContent>
      <PrivacyPolicyModal
        open={openPolicyModal}
        onClose={() => setOpenPolicyModal(false)}
      />
    </Dialog>
  );
}
