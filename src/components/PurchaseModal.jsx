import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
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
  brandPink = "#E53888",
  deepText = "#1A1A1A",
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    cantidad_boletos: 1,
  });
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        cantidad_boletos: 1,
      });
      setAceptaPoliticas(false);
    }
  }, [open, evento]);

  if (!evento) return null;
  const isAgotado = evento.is_sold_out || false;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
  };

  const handleConfirmPurchase = async (payload) => {
    onClose();
    Swal.fire({
      title: "Procesando tu solicitud...",
      text: "Te estamos redireccionando a la pasarela de pago seguro.",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let url = "/reservar";
      const res = await MethodPost(url, payload);

      if (res.data && res.data.stripeUrl) {
        window.location.href = res.data.stripeUrl;
      } else {
        Swal.fire({
          title: "Ha habido un problema",
          text:
            res.data.message ||
            "Ocurrió un problema al generar el link de pago.",
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: deepText,
        });
      }
    } catch (error) {
      console.error("Ocurrió un error en el checkout:", error);
      Swal.fire({
        title: "Ocurrió un problema durante la compra",
        text: error.response?.data?.message || "Error de conexión",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: deepText,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      eventId: evento.id,
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

  // Estilos limpios y modernos para inputs
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#FAFAFA",
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: "rgba(100, 116, 139, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(229, 56, 136, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: brandPink,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: brandPink,
      fontWeight: 600,
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      scroll='body'
      PaperProps={{
        sx: {
          borderRadius: "28px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(229, 56, 136, 0.12)",
          overflow: "hidden",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 18,
          right: 18,
          color: "#64748B",
          bgcolor: "#F1F5F9",
          p: 1,
          "&:hover": { color: deepText, bgcolor: "#E2E8F0" },
          zIndex: 10,
        }}
      >
        <CloseIcon fontSize='small' />
      </IconButton>

      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box component='form' onSubmit={handleSubmit}>
          {/* ENCABEZADO */}
          <Box sx={{ mb: 3, pr: 4 }}>
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                fontWeight: 800,
                color: brandPink,
                letterSpacing: "1px",
                display: "block",
                mb: 0.5,
              }}
            >
              Estás adquiriendo accesos para:
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 800,
                color: deepText,
                lineHeight: 1.2,
                fontSize: "1.35rem",
              }}
            >
              {evento.titulo}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: "#64748B",
                fontWeight: 600,
                display: "block",
                mt: 1,
                fontSize: "0.85rem",
              }}
            >
              📍 {evento.lugar} • 📅 {FormatDate(evento.fecha)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "rgba(229, 56, 136, 0.1)" }} />

          {/* FORMULARIO */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
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
                    <PersonIcon sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />

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
                    <EmailIcon sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />

            <TextField
              required
              fullWidth
              type='tel'
              label='Número de WhatsApp'
              name='telefono'
              value={formData.telefono}
              onChange={handleChange}
              variant='outlined'
              placeholder='10 dígitos (Ej. 5512345678)'
              autoComplete='off'
              inputProps={{ pattern: "[0-9]{10}" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <WhatsAppIcon sx={{ color: "#94A3B8" }} />
                  </InputAdornment>
                ),
              }}
              sx={inputStyles}
            />

            {/* SELECCIÓN DE CANTIDAD */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                border: "1px solid #E2E8F0",
              }}
            >
              <Box>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 700, color: deepText }}
                >
                  Cantidad de Accesos
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ color: "#64748B", fontWeight: 600 }}
                >
                  {formatMexicanCurrency(Number(evento.costo) || 0)} MXN c/u
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <IconButton
                  onClick={handleDecrement}
                  disabled={formData.cantidad_boletos <= 1}
                  sx={{
                    bgcolor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    p: 0.8,
                    "&:hover": { bgcolor: "#F1F5F9" },
                    "&.Mui-disabled": { opacity: 0.5 },
                  }}
                >
                  <RemoveIcon sx={{ fontSize: "1rem", color: deepText }} />
                </IconButton>

                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 800,
                    minWidth: "24px",
                    textAlign: "center",
                    color: deepText,
                  }}
                >
                  {formData.cantidad_boletos}
                </Typography>

                <IconButton
                  onClick={handleIncrement}
                  sx={{
                    bgcolor: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    p: 0.8,
                    "&:hover": { bgcolor: "#F1F5F9" },
                  }}
                >
                  <AddIcon sx={{ fontSize: "1rem", color: deepText }} />
                </IconButton>
              </Box>
            </Box>

            {/* AVISO DE PAGO */}
            <Box
              sx={{
                bgcolor: "#FFF0F5",
                p: 1.5,
                borderRadius: "12px",
                border: "1px solid rgba(229, 56, 136, 0.15)",
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: "#831843",
                  fontWeight: 600,
                  display: "block",
                  textAlign: "center",
                }}
              >
                💳 Aceptamos <b>Tarjetas de Débito/Crédito</b> y efectivo en{" "}
                <b>OXXO</b>.
              </Typography>
            </Box>
          </Box>

          {/* TOTAL */}
          <Box
            sx={{
              mt: 3,
              mb: 2.5,
              p: 2,
              borderRadius: "16px",
              border: `2px dashed rgba(229, 56, 136, 0.3)`,
              bgcolor: "rgba(229, 56, 136, 0.02)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant='body2'
              sx={{ fontWeight: 700, color: "#64748B" }}
            >
              Total a pagar:
            </Typography>
            <Typography variant='h5' sx={{ fontWeight: 800, color: deepText }}>
              {formatMexicanCurrency(Number(totalPago))}{" "}
              <Box
                component='span'
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#94A3B8",
                }}
              >
                MXN
              </Box>
            </Typography>
          </Box>

          {/* POLÍTICAS DE PRIVACIDAD */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 3,
              px: 0.5,
            }}
          >
            <Checkbox
              checked={aceptaPoliticas}
              onChange={(e) => setAceptaPoliticas(e.target.checked)}
              size='small'
              sx={{
                color: "#CBD5E1",
                p: "2px",
                "&.Mui-checked": { color: brandPink },
              }}
            />
            <Typography
              variant='caption'
              sx={{
                color: "#64748B",
                fontWeight: 500,
                lineHeight: 1.4,
                userSelect: "none",
              }}
            >
              Al realizar la compra, confirmo que soy mayor de edad y acepto de
              conformidad la{" "}
              <Box
                component='span'
                onClick={() => setOpenPolicyModal(true)}
                sx={{
                  color: brandPink,
                  fontWeight: 700,
                  textDecoration: "underline",
                  cursor: "pointer",
                  "&:hover": { color: deepText },
                }}
              >
                política de privacidad
              </Box>{" "}
              de la plataforma.
            </Typography>
          </Box>

          {/* BOTÓN DE ACCIÓN */}
          <Button
            type='submit'
            variant='contained'
            fullWidth
            startIcon={<ConfirmationNumberIcon />}
            disabled={!aceptaPoliticas || isAgotado}
            sx={{
              bgcolor: brandPink,
              color: "#FFF",
              borderRadius: "16px",
              fontWeight: 700,
              fontSize: "0.95rem",
              py: 1.6,
              textTransform: "none",
              boxShadow: "0 10px 20px -5px rgba(229, 56, 136, 0.4)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                bgcolor: "#D82E7A",
                boxShadow: "0 12px 24px -4px rgba(229, 56, 136, 0.5)",
                transform: "translateY(-1px)",
              },
              "&.Mui-disabled": {
                bgcolor: "#E2E8F0",
                color: "#94A3B8",
                boxShadow: "none",
              },
            }}
          >
            {isAgotado ? "Agotado Temporalmente" : "Proceder al Pago Seguro"}
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
