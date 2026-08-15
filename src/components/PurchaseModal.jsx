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
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
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
      setAceptaPoliticas(false); // Reiniciar el checkbox al abrir
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

  // Estilos comunes reutilizables para inputs refinados
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      transition: "all 0.3s ease",
      "&.Mui-focused fieldset": {
        borderColor: brandPink,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: brandPink,
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
          bgcolor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(61, 43, 47, 0.18)",
          border: "1px solid rgba(238, 111, 151, 0.25)",
          overflow: "hidden",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "rgba(61, 43, 47, 0.4)",
          "&:hover": { color: deepText, bgcolor: "rgba(61,43,47,0.05)" },
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: { xs: 3, sm: 4.5 } }}>
        <Box component='form' onSubmit={handleSubmit}>
          {/* ENCABEZADO */}
          <Box sx={{ mb: 3, pr: 3 }}>
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                fontWeight: 900,
                color: brandPink,
                letterSpacing: "0.1em",
                display: "block",
              }}
            >
              Estás adquiriendo accesos para:
            </Typography>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 900,
                color: deepText,
                lineHeight: 1.15,
                mt: 0.5,
                textTransform: "uppercase",
              }}
            >
              {evento.titulo}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: "rgba(61, 43, 47, 0.6)",
                fontWeight: 700,
                display: "block",
                mt: 0.8,
              }}
            >
              📍 {evento.lugar} • 📅 {FormatDate(evento.fecha)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3, borderColor: "rgba(238, 111, 151, 0.15)" }} />

          {/* FORMULARIO */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
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
                    <PersonIcon sx={{ color: "rgba(61, 43, 47, 0.35)" }} />
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
                    <EmailIcon sx={{ color: "rgba(61, 43, 47, 0.35)" }} />
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
                    <WhatsAppIcon sx={{ color: "rgba(61, 43, 47, 0.35)" }} />
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
                  sx={{ color: "rgba(61, 43, 47, 0.5)", fontWeight: 700 }}
                >
                  {formatMexicanCurrency(Number(evento.costo) || 0)} MXN c/u
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <IconButton
                  onClick={handleDecrement}
                  disabled={formData.cantidad_boletos <= 1}
                  sx={{
                    bgcolor: "#FFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    p: 0.8,
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <RemoveIcon sx={{ fontSize: "1.1rem", color: deepText }} />
                </IconButton>

                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 900,
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
                    bgcolor: "#FFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    p: 0.8,
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <AddIcon sx={{ fontSize: "1.1rem", color: deepText }} />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: "rgba(238, 111, 151, 0.08)",
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'
              >
                Aceptamos **Tarjetas de Débito/Crédito** y pagos en efectivo en
                **OXXO**.
              </Typography>
            </Box>
          </Box>

          {/* TOTAL */}
          <Box
            sx={{
              mt: 3.5,
              mb: 3,
              p: 2.2,
              borderRadius: "16px",
              border: `1.5px dashed ${brandPink}60`,
              bgcolor: `${brandPink}05`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant='body2'
                sx={{ fontWeight: 800, color: "rgba(61, 43, 47, 0.5)" }}
              >
                Total a pagar:
              </Typography>
              <Typography
                variant='h4'
                sx={{ fontWeight: 900, color: deepText }}
              >
                {formatMexicanCurrency(Number(totalPago))}{" "}
                <Box
                  component='span'
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "rgba(61, 43, 47, 0.4)",
                  }}
                >
                  MXN
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* POLÍTICAS DE PRIVACIDAD */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              mb: 3.5,
              px: 0.5,
            }}
          >
            <Checkbox
              checked={aceptaPoliticas}
              onChange={(e) => setAceptaPoliticas(e.target.checked)}
              size='small'
              sx={{
                color: "rgba(61, 43, 47, 0.3)",
                p: "2px",
                "&.Mui-checked": { color: brandPink },
              }}
            />
            <Typography
              variant='caption'
              sx={{
                color: "rgba(61, 43, 47, 0.75)",
                fontWeight: 600,
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
                  fontWeight: 800,
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
              borderRadius: "14px",
              fontWeight: 800,
              fontSize: "1rem",
              py: 1.8,
              textTransform: "none",
              boxShadow: `0 8px 24px rgba(238, 111, 151, 0.3)`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "#D64C77",
                boxShadow: "0 10px 28px rgba(61, 43, 47, 0.25)",
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
