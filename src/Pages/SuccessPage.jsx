import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import PaymentSuccessBanner from "../components/payments/PaymentSuccessBanner";
const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(15);

  // Paleta Unificada de Marca
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const oxxoOrange = "#E03C31";

  // Lectura de Estado / Query Params
  const searchParams = new URLSearchParams(location.search);
  const isOxxo =
    searchParams.get("payment_method") === "oxxo" ||
    location.state?.isOxxo === true;

  const nombreEvento = location.state?.eventTitle || "tu evento seleccionado";
  const oxxoVoucherUrl = location.state?.oxxoVoucherUrl || null;

  // Redirección Automática (Solo para Pagos con Tarjeta)
  useEffect(() => {
    if (isOxxo) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate, isOxxo]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: lightBg,
        backgroundImage: `radial-gradient(circle at 50% 20%, rgba(225, 29, 116, 0.08) 0%, transparent 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container maxWidth='sm'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3.5, md: 6 },
              borderRadius: "28px",
              textAlign: "center",
              bgcolor: "#FFFFFF",
              border: `1px solid ${
                isOxxo ? "rgba(224, 60, 49, 0.2)" : "rgba(225, 29, 116, 0.15)"
              }`,
              boxShadow: "0 20px 50px -10px rgba(225, 29, 116, 0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Banner e Información Dinámica */}
            <PaymentSuccessBanner
              isOxxo={isOxxo}
              nombreEvento={nombreEvento}
              oxxoVoucherUrl={oxxoVoucherUrl}
              brandPink={brandPink}
              darkText={darkText}
              oxxoOrange={oxxoOrange}
            />

            {/* Acciones e Indicador de Redirección */}
            <Box
              display='flex'
              flexDirection={{ xs: "column-reverse", sm: "row" }}
              alignItems='center'
              justifyContent='center'
              gap={2.5}
            >
              <Button
                variant='contained'
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: "50px",
                  px: 4.5,
                  py: 1.6,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  textTransform: "none",
                  boxShadow: `0 8px 20px rgba(225, 29, 116, 0.3)`,
                  "&:hover": {
                    bgcolor: darkText,
                    color: "#FFF",
                    boxShadow: "0 10px 25px rgba(43, 30, 34, 0.25)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Volver al inicio
              </Button>

              {/* Contado Regresivo Visual */}
              {!isOxxo && (
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress
                    variant='determinate'
                    value={(countdown / 15) * 100}
                    size={44}
                    thickness={4}
                    sx={{ color: darkText }}
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
                        color: darkText,
                        fontWeight: 900,
                        fontSize: "0.75rem",
                      }}
                    >
                      {countdown}s
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Sello Inferior */}
            <Typography
              variant='caption'
              display='block'
              sx={{
                color: "rgba(43, 30, 34, 0.3)",
                fontWeight: 800,
                letterSpacing: 2,
                mt: 4,
                fontSize: "0.68rem",
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
