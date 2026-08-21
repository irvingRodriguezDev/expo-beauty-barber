import React, { useState } from "react";
import { confirmResetPassword } from "aws-amplify/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function ConfirmResetPasswordForm({
  username,
  destination,
  onResetSuccess,
  onCancel,
}) {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
      onResetSuccess();
    } catch (err) {
      setError(err.message || "Código inválido o error al restablecer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      {/* Encabezado */}
      <Box sx={{ textAlign: "center", mb: 2.5 }}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 800,
            color: "text.primary",
            letterSpacing: "-0.02em",
            fontSize: "1.35rem",
          }}
        >
          Confirmar Restablecimiento
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", mt: 0.8, lineHeight: 1.4 }}
        >
          Ingresa el código que recibiste y define tu nueva contraseña.
        </Typography>
      </Box>

      {/* Alertas */}
      {destination && (
        <Alert
          severity='info'
          sx={{ mb: 2, borderRadius: "12px", fontSize: "0.85rem" }}
        >
          Código enviado a: <strong>{destination}</strong>
        </Alert>
      )}

      {error && (
        <Alert severity='error' sx={{ mb: 2, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Código de Verificación */}
      <TextField
        fullWidth
        label='Código de Verificación'
        margin='normal'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <KeyOutlinedIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          sx: { borderRadius: "12px" },
        }}
      />

      {/* Nueva Contraseña */}
      <TextField
        fullWidth
        label='Nueva Contraseña'
        type={showPassword ? "text" : "password"}
        margin='normal'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockOutlinedIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
                aria-label='mostrar u ocultar contraseña'
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: "12px" },
        }}
      />

      {/* Botón Principal */}
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
          "Restablecer Contraseña"
        )}
      </Button>

      {/* Opción Cancelar / Volver */}
      <Box textAlign='center' sx={{ mt: 1 }}>
        <Link
          component='button'
          type='button'
          variant='body2'
          underline='hover'
          onClick={onCancel}
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
          Cancelar y Volver
        </Link>
      </Box>
    </Box>
  );
}
