// src/pages/admin/AdminLoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, confirmSignIn } from "aws-amplify/auth";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

const AdminLogin = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");

  // Estados de control de flujo
  const [showPassword, setShowPassword] = useState(false);
  const [requiresNewPassword, setRequiresNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Manejador del submit principal (SignIn)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        name: name,
        password: password,
      });

      if (isSignedIn) {
        navigate("/admin/dashboard", { replace: true });
      } else if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        // Maneja el caso cuando el admin fue creado desde AWS con contraseña temporal
        setRequiresNewPassword(true);
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (
        err.name === "UserNotFoundException" ||
        err.name === "NotAuthorizedException"
      ) {
        setError("Correo electrónico o contraseña incorrectos.");
      } else {
        setError(err.message || "Ocurrió un error inesperado al autenticar.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejador para establecer la contraseña definitiva
  const handleConfirmNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
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

      if (isSignedIn) {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Error al actualizar contraseña:", err);
      setError(err.message || "No se pudo actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFD9E2", // Slate 900
        px: 2,
      }}
    >
      <Container maxWidth='sm'>
        <Card
          elevation={8}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#ffff", // Slate 800
            color: "#3C2B2F",
            border: "1px solid #3C2B2F",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header / Logo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#EC4899", // Color distintivo / Pink Accent
                  p: 1.5,
                  borderRadius: "50%",
                  display: "flex",
                  mb: 1.5,
                }}
              >
                <LockOutlined sx={{ color: "#FFFFFF", fontSize: 28 }} />
              </Box>
              <Typography
                variant='h5'
                component='h1'
                fontWeight='bold'
                align='center'
              >
                Expo Beauty Business
              </Typography>
              <Typography variant='body2' sx={{ color: "#94A3B8", mt: 0.5 }}>
                {requiresNewPassword
                  ? "Establece tu nueva contraseña"
                  : "Panel de Administración"}
              </Typography>
            </Box>

            {/* Alerta de Error */}
            {error && (
              <Alert
                severity='error'
                sx={{ mb: 3, backgroundColor: "#450A0A", color: "#FECDD3" }}
              >
                {error}
              </Alert>
            )}

            {/* FORMULARIO 1: Inicio de Sesión Normal */}
            {!requiresNewPassword ? (
              <Box component='form' onSubmit={handleLogin} noValidate>
                <TextField
                  fullWidth
                  margin='normal'
                  label='Correo Electrónico'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant='outlined'
                  autoComplete='off'
                  sx={inputStyles}
                />

                <TextField
                  fullWidth
                  margin='normal'
                  label='Contraseña'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant='outlined'
                  autoComplete='off'
                  sx={inputStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                          sx={{ color: "#94A3B8" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 1,
                    py: 1.5,
                    backgroundColor: "#EC4899",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#DB2777" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </Box>
            ) : (
              /* FORMULARIO 2: Cambio de Contraseña Temporal */
              <Box
                component='form'
                onSubmit={handleConfirmNewPassword}
                noValidate
              >
                <Alert
                  severity='info'
                  sx={{ mb: 2, backgroundColor: "#3c2b2f", color: "#fff" }}
                >
                  Es tu primer inicio de sesión. Por favor ingresa una nueva
                  contraseña.
                </Alert>
                <TextField
                  fullWidth
                  margin='normal'
                  label='Nombre'
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant='outlined'
                  sx={inputStyles}
                />
                <TextField
                  fullWidth
                  margin='normal'
                  label='Nueva Contraseña'
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  variant='outlined'
                  sx={inputStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                          sx={{ color: "#94A3B8" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 1,
                    py: 1.5,
                    backgroundColor: "#EC4899",
                    fontWeight: "bold",
                    ":hover": { backgroundColor: "#EC4899" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "Guardar y Continuar"
                  )}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

// Estilos personalizados para los inputs oscuros con MUI
const inputStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#000",
    "& fieldset": { borderColor: "#475569" },
    "&:hover fieldset": { borderColor: "#94A3B8" },
    "&.Mui-focused fieldset": { borderColor: "#EC4899" },
  },
  "& .MuiInputLabel-root": { color: "#94A3B8" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#EC4899" },
};

export default AdminLogin;
