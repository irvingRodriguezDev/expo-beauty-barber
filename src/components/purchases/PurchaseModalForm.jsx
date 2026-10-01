import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PurchaseSummaryCard from "./PurchaseSummaryCard";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";

export default function PurchaseModalForm({
  evento,
  isAgotado,
  onSubmit,
  onOpenPolicyModal,
  brandPink = "#E11D74",
  darkText = "#2B1E22",
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    cantidad_boletos: 1,
  });
  const [aceptaPoliticas, setAceptaPoliticas] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      eventId: evento.id,
      evento: evento.titulo,
      buyerName: formData.nombre,
      buyerEmail: formData.correo,
      buyerPhone: formData.telefono,
      cantidadBoletos: Number(formData.cantidad_boletos),
      total: formData.cantidad_boletos * evento.costo,
    });
  };

  const totalPago = Number(formData.cantidad_boletos) * Number(evento.costo);

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
    <Box component='form' onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                <PersonIcon sx={{ color: "rgba(43, 30, 34, 0.35)" }} />
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
                <EmailIcon sx={{ color: "rgba(43, 30, 34, 0.35)" }} />
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
                <WhatsAppIcon sx={{ color: "rgba(43, 30, 34, 0.35)" }} />
              </InputAdornment>
            ),
          }}
          sx={inputStyles}
        />

        {/* Selección de Cantidad */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.8,
            borderRadius: "16px",
            bgcolor: "rgba(43, 30, 34, 0.03)",
            border: "1px solid rgba(43, 30, 34, 0.05)",
          }}
        >
          <Box>
            <Typography
              variant='body2'
              sx={{ fontWeight: 800, color: darkText }}
            >
              Cantidad de Accesos
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: "rgba(43, 30, 34, 0.5)", fontWeight: 700 }}
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
              <RemoveIcon sx={{ fontSize: "1.1rem", color: darkText }} />
            </IconButton>

            <Typography
              variant='body1'
              sx={{
                fontWeight: 900,
                minWidth: "24px",
                textAlign: "center",
                color: darkText,
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
              <AddIcon sx={{ fontSize: "1.1rem", color: darkText }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Resumen de Total */}
      <PurchaseSummaryCard
        totalPago={totalPago}
        brandPink={brandPink}
        darkText={darkText}
      />

      {/* Políticas de Privacidad */}
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
            color: "rgba(43, 30, 34, 0.3)",
            p: "2px",
            "&.Mui-checked": { color: brandPink },
          }}
        />
        <Typography
          variant='caption'
          sx={{
            color: "rgba(43, 30, 34, 0.75)",
            fontWeight: 600,
            lineHeight: 1.4,
            userSelect: "none",
          }}
        >
          Al realizar la compra, confirmo que soy mayor de edad y acepto la{" "}
          <Box
            component='span'
            onClick={onOpenPolicyModal}
            sx={{
              color: brandPink,
              fontWeight: 800,
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { color: darkText },
            }}
          >
            política de privacidad
          </Box>{" "}
          de la plataforma.
        </Typography>
      </Box>

      {/* Botón de Submit */}
      <Button
        type='submit'
        variant='contained'
        fullWidth
        startIcon={<ConfirmationNumberIcon />}
        disabled={!aceptaPoliticas || isAgotado}
        sx={{
          bgcolor: brandPink,
          color: "#FFF",
          borderRadius: "50px",
          fontWeight: 800,
          fontSize: "0.95rem",
          py: 1.6,
          textTransform: "none",
          boxShadow: `0 8px 24px rgba(225, 29, 116, 0.3)`,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            bgcolor: "#c91361",
            boxShadow: "0 10px 28px rgba(43, 30, 34, 0.25)",
          },
          "&:disabled": {
            bgcolor: "rgba(43, 30, 34, 0.08) !important",
            color: "rgba(43, 30, 34, 0.35) !important",
          },
        }}
      >
        {isAgotado ? "Agotado Temporalmente" : "Proceder al Pago Seguro"}
      </Button>
    </Box>
  );
}
