import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(12);

  // --- PALETA COHERENTE WAPIZIMA ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const softBg = "#FFF0F4"; // Ajustado al fondo pastel premium que usamos en el detalle

  // Intentamos recuperar el nombre del evento desde el estado de la navegación (opcional)
  // Si no viene ninguno, dejamos un texto genérico impecable.
  const nombreEvento = location.state?.eventTitle || "tu evento seleccionado";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

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
        background: softBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container maxWidth='sm'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: "24px", // Ajustado a bordes más orgánicos y premium
              textAlign: "center",
              background: "#FFFFFF",
              border: `1px solid rgba(238, 111, 151, 0.25)`,
              boxShadow: "0 40px 100px rgba(61, 43, 47, 0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animación de check principal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <CheckCircleOutlineIcon
                sx={{ fontSize: 90, color: brandPink, mb: 4 }}
              />
            </motion.div>

            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: deepText,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              ¡ACCESO <span style={{ color: brandPink }}>CONFIRMADO</span>!
            </Typography>

            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.75)",
                mb: 4,
                lineHeight: 1.7,
                fontSize: "1.05rem",
                fontWeight: 600,
                px: { md: 2 },
              }}
            >
              Tus boletos para <b>{nombreEvento.toUpperCase()}</b> han sido
              validados con éxito. Enviamos tus accesos digitales y códigos QR
              de entrada directamente a tu correo electrónico.
            </Typography>

            <Stack
              direction='row'
              spacing={1.5}
              alignItems='center'
              justifyContent='center'
              sx={{
                mb: 6,
                color: brandPink,
                bgcolor: `${brandPink}12`, // Fondo rosa translúcido más sutil
                py: 1.5,
                px: 3,
                borderRadius: "12px",
                display: "inline-flex",
              }}
            >
              <MailOutlineIcon fontSize='small' />
              <Typography
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  fontSize: "0.75rem",
                }}
              >
                REVISA TU BANDEJA DE ENTRADA
              </Typography>
            </Stack>

            <Box
              display='flex'
              flexDirection={{ xs: "column-reverse", sm: "row" }}
              alignItems='center'
              justifyContent='center'
              gap={3}
              sx={{ mb: 2 }}
            >
              {/* Botón Principal */}
              <Button
                variant='contained'
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: brandPink, // Cambiado a rosa para consistencia de botones de Wapizima
                  color: "#FFF",
                  borderRadius: "14px",
                  px: 5,
                  py: 1.8,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "none", // Elimina el uppercase forzado feo
                  boxShadow: `0 10px 25px rgba(238, 111, 151, 0.3)`,
                  "&:hover": {
                    bgcolor: deepText,
                    color: "#FFF",
                    boxShadow: "0 10px 25px rgba(61, 43, 47, 0.2)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Volver al inicio
              </Button>

              {/* Cuenta Regresiva de Redirección */}
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  verticalAlign: "middle",
                }}
              >
                <CircularProgress
                  variant='determinate'
                  value={(countdown / 12) * 100}
                  size={46}
                  thickness={4}
                  sx={{ color: deepText }}
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
                    variant='caption'
                    sx={{
                      color: deepText,
                      fontWeight: 900,
                      fontSize: "0.75rem",
                    }}
                  >
                    {countdown}s
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Decoración inferior de marca sutil */}
            <Typography
              variant='caption'
              display='block'
              sx={{
                color: "rgba(61, 43, 47, 0.3)",
                fontWeight: 800,
                letterSpacing: 2,
                mt: 4,
                fontSize: "0.7rem",
              }}
            >
              WAPIZIMA EVENTOS
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SuccessPage;
