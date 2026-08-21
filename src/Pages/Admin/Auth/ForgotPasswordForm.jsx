import React, { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function ForgotPasswordForm({ onCodeSent, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const output = await resetPassword({ username });
      const { nextStep } = output;

      if (nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
        const destination =
          nextStep.codeDeliveryDetails?.destination || "tu correo";
        onCodeSent(username, destination);
      }
    } catch (err) {
      setError(err.message || "Error al solicitar el código de recuperación.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      {/* Encabezado del Formulario */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.02em",
            fontSize: "1.35rem",
          }}
        >
          Recuperar Contraseña
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", mt: 0.8, lineHeight: 1.4 }}
        >
          Ingresa tu correo registrado y te enviaremos las instrucciones para
          restablecerla.
        </Typography>
      </Box>

      {/* Alerta de error */}
      {error && (
        <Alert severity='error' sx={{ mb: 2.5, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Input de Correo con Icono */}
      <TextField
        fullWidth
        label='Correo Electrónico'
        margin='normal'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailOutlinedIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          sx: { borderRadius: "12px" },
        }}
      />

      {/* Botón de Envío Principal */}
      <Button
        type='submit'
        fullWidth
        variant='contained'
        disabled={submitting}
        sx={{
          mt: 2.5,
          mb: 2,
          py: 1.4,
          borderRadius: "12px",
          backgroundColor: "#E53888",
          fontSize: "0.95rem",
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 8px 20px -4px rgba(229, 56, 136, 0.4)",
          "&:hover": {
            backgroundColor: "#C82670",
            boxShadow: "0 10px 24px -4px rgba(229, 56, 136, 0.5)",
          },
        }}
      >
        {submitting ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Enviar Código"
        )}
      </Button>

      {/* Enlace para regresar */}
      <Box textAlign='center' sx={{ mt: 1 }}>
        <Link
          component='button'
          type='button'
          variant='body2'
          underline='hover'
          onClick={onBackToLogin}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "0.85rem",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "#E53888",
            },
          }}
        >
          <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
          Volver al Inicio de Sesión
        </Link>
      </Box>
    </Box>
  );
}
