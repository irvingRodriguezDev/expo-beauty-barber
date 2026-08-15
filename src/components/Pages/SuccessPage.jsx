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
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(15);

  // --- PALETA COHERENTE WAPIZIMA ---
  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const softBg = "#FFF0F4";
  const oxxoOrange = "#E03C31"; // Acento discreto para OXXO

  // --- LEER QUERY PARAMS Y STATE ---
  const searchParams = new URLSearchParams(location.search);

  // Detectamos si es OXXO por URL (?payment_method=oxxo) o por state
  const isOxxo =
    searchParams.get("payment_method") === "oxxo" ||
    location.state?.isOxxo === true;

  const nombreEvento = location.state?.eventTitle || "tu evento seleccionado";
  const oxxoVoucherUrl = location.state?.oxxoVoucherUrl || null;

  // Si es OXXO, desactivamos la redirección automática para dar tiempo de ver la ficha
  useEffect(() => {
    if (isOxxo) return; // No auto-redirigir si es OXXO

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
              p: { xs: 4, md: 7 },
              borderRadius: "24px",
              textAlign: "center",
              background: "#FFFFFF",
              border: `1px solid ${isOxxo ? "rgba(224, 60, 49, 0.2)" : "rgba(238, 111, 151, 0.25)"}`,
              boxShadow: "0 40px 100px rgba(61, 43, 47, 0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animación del Ícono Principal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              {isOxxo ? (
                <StorefrontIcon
                  sx={{ fontSize: 90, color: oxxoOrange, mb: 3 }}
                />
              ) : (
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: brandPink, mb: 3 }}
                />
              )}
            </motion.div>

            {/* Título Principal Dinámico */}
            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                color: deepText,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.3rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {isOxxo ? (
                <>
                  ¡FICHA DE PAGO{" "}
                  <span style={{ color: oxxoOrange }}>GENERADA</span>!
                </>
              ) : (
                <>
                  ¡ACCESO <span style={{ color: brandPink }}>CONFIRMADO</span>!
                </>
              )}
            </Typography>

            {/* Descripción Dinámica */}
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
              {isOxxo ? (
                <>
                  Has reservado tu lugar para{" "}
                  <b>{nombreEvento.toUpperCase()}</b>. Enviamos el voucher
                  oficial de pago en efectivo a tu correo. Tienes hasta
                  <b> 5 días</b> para acudir a cualquier sucursal OXXO.
                </>
              ) : (
                <>
                  Tus boletos para <b>{nombreEvento.toUpperCase()}</b> han sido
                  validados con éxito. Enviamos tus accesos digitales y códigos
                  QR de entrada directamente a tu correo electrónico.
                </>
              )}
            </Typography>

            {/* Badge Informativo de Correo */}
            <Stack
              direction='row'
              spacing={1.5}
              alignItems='center'
              justifyContent='center'
              sx={{
                mb: 4,
                color: isOxxo ? oxxoOrange : brandPink,
                bgcolor: isOxxo ? `${oxxoOrange}10` : `${brandPink}12`,
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
                  letterSpacing: 1.2,
                  fontSize: "0.75rem",
                }}
              >
                REVISA TU BANDEJA DE ENTRADA
              </Typography>
            </Stack>

            {/* Botón Adicional si es OXXO (Imprimir Ficha) */}
            {isOxxo && oxxoVoucherUrl && (
              <Box sx={{ mb: 4 }}>
                <Button
                  variant='outlined'
                  href={oxxoVoucherUrl}
                  target='_blank'
                  startIcon={<ReceiptLongIcon />}
                  sx={{
                    borderColor: oxxoOrange,
                    color: oxxoOrange,
                    borderRadius: "14px",
                    px: 3,
                    py: 1.2,
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: deepText,
                      color: deepText,
                      bgcolor: "rgba(61, 43, 47, 0.04)",
                    },
                  }}
                >
                  Ver / Imprimir Ficha de Pago OXXO
                </Button>
              </Box>
            )}

            {/* Acciones e Indicador de Redirección */}
            <Box
              display='flex'
              flexDirection={{ xs: "column-reverse", sm: "row" }}
              alignItems='center'
              justifyContent='center'
              gap={3}
              sx={{ mb: 2 }}
            >
              <Button
                variant='contained'
                onClick={() => navigate("/")}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: "14px",
                  px: 5,
                  py: 1.8,
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "0.1em",
                  textTransform: "none",
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

              {/* Cuenta Regresiva solo para Tarjeta */}
              {!isOxxo && (
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                    verticalAlign: "middle",
                  }}
                >
                  <CircularProgress
                    variant='determinate'
                    value={(countdown / 15) * 100}
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
              )}
            </Box>

            {/* Decoración inferior */}
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
