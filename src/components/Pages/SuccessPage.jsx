import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";

const brandCyan = "#72F8FF";
const darkPetroleum = "#042F35";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(12);

  useEffect(() => {
    // Timer para la cuenta regresiva
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirección automática a los 12 segundos
    const redirect = setTimeout(() => {
      navigate("/");
    }, 12000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `radial-gradient(circle at center, #064E57 0%, ${darkPetroleum} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container maxWidth='sm'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 8,
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(114, 248, 255, 0.1)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animación de check principal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 100, color: brandCyan, mb: 4 }}
              />
            </motion.div>

            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: "#FFF",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              ¡PAGO CONFIRMADO!
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 4,
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              Tu registro para la <b>Expo Belleza & Barber 2027</b> se ha
              procesado con éxito. En breve recibirás un correo electrónico con
              tus <b>accesos digitales y códigos QR</b>.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 6,
                color: brandCyan,
              }}
            >
              <EmailIcon />
              <Typography sx={{ fontWeight: 700, letterSpacing: 1 }}>
                REVISA TU BANDEJA DE ENTRADA
              </Typography>
            </Box>

            {/* Botón y Cuenta Regresiva */}
            <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
              <CircularProgress
                variant='determinate'
                value={(countdown / 12) * 100}
                size={80}
                sx={{ color: brandCyan, opacity: 0.3 }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ color: brandCyan, fontWeight: 900 }}
                >
                  {countdown}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant='caption'
              display='block'
              sx={{ color: "rgba(255,255,255,0.4)", mb: 4 }}
            >
              Serás redirigido al inicio automáticamente
            </Typography>

            <Button
              variant='outlined'
              onClick={() => navigate("/")}
              sx={{
                borderColor: brandCyan,
                color: brandCyan,
                borderRadius: 4,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                "&:hover": {
                  borderColor: "#FFF",
                  color: "#FFF",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              VOLVER AL INICIO AHORA
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SuccessPage;
