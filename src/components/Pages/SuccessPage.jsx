import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [countdown, setCountdown] = useState(12);

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const softBg = "#FFD9E2";

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
              borderRadius: 2,
              textAlign: "center",
              background: "#FFFFFF",
              border: `1px solid rgba(255, 183, 206, 0.4)`,
              boxShadow: "0 40px 100px rgba(61, 43, 47, 0.08)",
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
                // fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2rem", md: "2.8rem" },
                letterSpacing: "-0.02em",
              }}
            >
              ¡REGISTRO <span style={{ color: brandPink }}>EXITOSO</span>!
            </Typography>

            <Typography
              sx={{
                color: "rgba(61, 43, 47, 0.6)",
                mb: 4,
                lineHeight: 1.7,
                fontSize: "1.1rem",
                fontWeight: 500,
                px: { md: 4 },
              }}
            >
              Tu lugar en la <b>CONVENCIÓN WAPIZIMA 2026</b> está asegurado.
              Enviamos tus accesos digitales y códigos QR a tu correo
              electrónico.
            </Typography>

            <Stack
              direction='row'
              spacing={1.5}
              alignItems='center'
              justifyContent='center'
              sx={{
                mb: 6,
                color: brandPink,
                bgcolor: softBg,
                py: 1.5,
                px: 3,
                borderRadius: 2,
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

            <Box sx={{ display: "block", mb: 6 }}>
              {/* Botón y Cuenta Regresiva integrados */}
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  verticalAlign: "middle",
                  mr: 2,
                }}
              >
                <CircularProgress
                  variant='determinate'
                  value={(countdown / 12) * 100}
                  size={50}
                  thickness={3}
                  sx={{ color: brandPink }}
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
                      fontSize: "0.7rem",
                    }}
                  >
                    {countdown}s
                  </Typography>
                </Box>
              </Box>

              <Button
                variant='contained'
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: deepText,
                  color: "#FFF",
                  borderRadius: 3,
                  px: 6,
                  py: 1.8,
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  boxShadow: "0 10px 30px rgba(61, 43, 47, 0.2)",
                  "&:hover": {
                    bgcolor: brandPink,
                    color: deepText,
                  },
                }}
              >
                VOLVER AL INICIO
              </Button>
            </Box>

            <Typography
              variant='caption'
              display='block'
              sx={{
                color: "rgba(61, 43, 47, 0.3)",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              WORLD TRADE CENTER · CDMX
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SuccessPage;
