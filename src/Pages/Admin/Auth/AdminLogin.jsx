import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "aws-amplify/auth";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useAuth } from "../../../context/AuthContext";
import NewPasswordRequiredForm from "./NewPasswordRequiredForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ConfirmResetPasswordForm from "./ConfirmResetPasswordForm";
import { inputStyles } from "../../../utils/InputStyles";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [step, setStep] = useState("LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [resetDestination, setResetDestination] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });

      if (isSignedIn) {
        await checkAuth();
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      if (
        nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setStep("NEW_PASSWORD");
      }
    } catch (err) {
      if (
        err.name === "UserNotFoundException" ||
        err.name === "NotAuthorizedException"
      ) {
        setError("El usuario o la contraseña son incorrectos.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleAuthSuccess = async () => {
    await checkAuth();
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #FFF0F5 0%, #FEEBF3 50%, #F4D5E2 100%)",
        position: "relative",
        overflow: "hidden",
        px: 2,
        // Ambient Light / Dynamic background accent
        "&::before": {
          content: '""',
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229,56,136,0.15) 0%, rgba(255,255,255,0) 70%)",
          top: "-10%",
          right: "-5%",
          zIndex: 0,
        },
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 440,
          width: "100%",
          p: { xs: 2, sm: 3 },
          borderRadius: "24px",
          border: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 40px -15px rgba(229, 56, 136, 0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CardContent sx={{ p: 1 }}>
          {infoMessage && (
            <Alert severity='success' sx={{ mb: 3, borderRadius: "12px" }}>
              {infoMessage}
            </Alert>
          )}

          {/* 1. LOGIN HABITUAL */}
          {step === "LOGIN" && (
            <Box component='form' onSubmit={handleLoginSubmit} noValidate>
              {/* Brand Logo Header */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    letterSpacing: "-0.02em",
                    fontSize: "1.5rem",
                  }}
                >
                  Bienvenido
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: "text.secondary", mt: 0.5 }}
                >
                  Ingresa tus credenciales para acceder al panel
                </Typography>
              </Box>

              {error && (
                <Alert severity='error' sx={{ mb: 2.5, borderRadius: "12px" }}>
                  {error}
                </Alert>
              )}

              {/* Email Input */}
              <TextField
                fullWidth
                label='Correo Electrónico'
                margin='normal'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete='off'
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutlinedIcon sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: "12px" },
                }}
              />

              {/* Password Input with Toggle Visibility */}
              <TextField
                fullWidth
                label='Contraseña'
                type={showPassword ? "text" : "password"}
                margin='normal'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={inputStyles}
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

              {/* Forgot Password Link */}
              <Box textAlign='right' sx={{ mt: 1, mb: 3 }}>
                <Link
                  component='button'
                  type='button'
                  variant='body2'
                  underline='hover'
                  onClick={() => {
                    setError(null);
                    setStep("FORGOT");
                  }}
                  sx={{
                    color: "#E53888",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={submitting}
                sx={{
                  py: 1.5,
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
                  "Iniciar Sesión"
                )}
              </Button>
            </Box>
          )}

          {/* 2. COMPONENTE NUEVO USUARIO */}
          {step === "NEW_PASSWORD" && (
            <NewPasswordRequiredForm onSuccess={handleAuthSuccess} />
          )}

          {/* 3. COMPONENTE SOLICITAR CÓDIGO */}
          {step === "FORGOT" && (
            <ForgotPasswordForm
              onCodeSent={(user, dest) => {
                setUsername(user);
                setResetDestination(dest);
                setStep("CONFIRM_RESET");
              }}
              onBackToLogin={() => setStep("LOGIN")}
            />
          )}

          {/* 4. COMPONENTE INGRESAR CÓDIGO Y NUEVO PASSWORD */}
          {step === "CONFIRM_RESET" && (
            <ConfirmResetPasswordForm
              username={username}
              destination={resetDestination}
              onResetSuccess={() => {
                setInfoMessage(
                  "Contraseña restablecida correctamente. Inicia sesión."
                );
                setStep("LOGIN");
              }}
              onCancel={() => setStep("LOGIN")}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
