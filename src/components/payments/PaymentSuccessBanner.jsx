import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function PaymentSuccessBanner({
  isOxxo,
  nombreEvento,
  oxxoVoucherUrl,
  brandPink = "#E11D74",
  darkText = "#2B1E22",
  oxxoOrange = "#E03C31",
}) {
  return (
    <>
      {/* Ícono Principal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        {isOxxo ? (
          <StorefrontIcon sx={{ fontSize: 80, color: oxxoOrange, mb: 2.5 }} />
        ) : (
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: brandPink, mb: 2.5 }}
          />
        )}
      </motion.div>

      {/* Título Principal */}
      <Typography
        variant='h3'
        sx={{
          fontWeight: 900,
          color: darkText,
          mb: 2,
          fontSize: { xs: "1.75rem", md: "2.2rem" },
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {isOxxo ? (
          <>
            ¡FICHA DE PAGO <span style={{ color: oxxoOrange }}>GENERADA</span>!
          </>
        ) : (
          <>
            ¡ACCESO <span style={{ color: brandPink }}>CONFIRMADO</span>!
          </>
        )}
      </Typography>

      {/* Descripción Informativa */}
      <Typography
        sx={{
          color: "rgba(43, 30, 34, 0.75)",
          mb: 3.5,
          lineHeight: 1.7,
          fontSize: "1rem",
          fontWeight: 500,
          px: { md: 2 },
        }}
      >
        {isOxxo ? (
          <>
            Has reservado tu lugar para{" "}
            <strong>{nombreEvento.toUpperCase()}</strong>. Enviamos el voucher
            oficial de pago en efectivo a tu correo. Tienes hasta{" "}
            <strong>5 días</strong> para acudir a cualquier sucursal OXXO.
          </>
        ) : (
          <>
            Tus boletos para <strong>{nombreEvento.toUpperCase()}</strong> han
            sido validados con éxito. Enviamos tus accesos digitales y códigos
            QR de entrada directamente a tu correo electrónico.
          </>
        )}
      </Typography>

      {/* Badge de Verificación de Correo */}
      <Stack
        direction='row'
        spacing={1.5}
        alignItems='center'
        justifyContent='center'
        sx={{
          mb: 4,
          color: isOxxo ? oxxoOrange : brandPink,
          bgcolor: isOxxo
            ? "rgba(224, 60, 49, 0.08)"
            : "rgba(225, 29, 116, 0.08)",
          py: 1.2,
          px: 2.5,
          borderRadius: "50px",
          display: "inline-flex",
        }}
      >
        <MailOutlineIcon fontSize='small' />
        <Typography
          sx={{
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: "0.75rem",
          }}
        >
          REVISA TU BANDEJA DE ENTRADA
        </Typography>
      </Stack>

      {/* Botón de Impresión Voucher OXXO */}
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
              borderRadius: "50px",
              px: 3,
              py: 1.2,
              fontWeight: 800,
              fontSize: "0.85rem",
              textTransform: "none",
              "&:hover": {
                borderColor: darkText,
                color: darkText,
                bgcolor: "rgba(43, 30, 34, 0.04)",
              },
            }}
          >
            Ver / Imprimir Ficha de Pago OXXO
          </Button>
        </Box>
      )}
    </>
  );
}
