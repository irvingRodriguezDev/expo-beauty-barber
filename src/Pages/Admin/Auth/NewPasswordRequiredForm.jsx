import React, { useState } from "react";
import { confirmSignIn } from "aws-amplify/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function NewPasswordRequiredForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { isSignedIn } = await confirmSignIn({
        challengeResponse: newPassword,
        options: {
          userAttributes: {
            name: name, // Atributo 'name' para Cognito
          },
        },
      });

      if (isSignedIn && onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(err.message || "Error al actualizar la contraseña.");
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
          Primer Inicio de Sesión
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", mt: 0.8, lineHeight: 1.4 }}
        >
          Es tu primera vez ingresando. Asigna tu nombre completo y define una
          contraseña permanente.
        </Typography>
      </Box>

      {/* Alerta de Error */}
      {error && (
        <Alert severity='error' sx={{ mb: 2.5, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Nombre Completo */}
      <TextField
        fullWidth
        label='Nombre Completo'
        margin='normal'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete='off'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonOutlinedIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
          sx: { borderRadius: "12px" },
        }}
      />

      {/* Nueva Contraseña */}
      <TextField
        fullWidth
        label='Nueva Contraseña Permanente'
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
          mt: 3,
          mb: 1,
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
          "Guardar y Continuar"
        )}
      </Button>
    </Box>
  );
}
