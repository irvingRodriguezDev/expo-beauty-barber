import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  Slide,
  IconButton,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Animación de abajo hacia arriba
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const PrivacyPolicyModal = ({ open, onClose }) => {
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#042F35";

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          bgcolor: darkPetroleum,
          backgroundImage: "none",
          color: "#FFF",
        },
      }}
    >
      {/* Header Fijo */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(114, 248, 255, 0.1)",
        }}
      >
        <Typography
          variant='h6'
          sx={{ fontWeight: 800, color: brandCyan, letterSpacing: 2 }}
        >
          POLÍTICA DE PRIVACIDAD
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#FFF" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Contenido Desplazable */}
      <Container maxWidth='md' sx={{ py: 6 }}>
        <Typography
          variant='body1'
          sx={{ mb: 4, lineHeight: 1.8, opacity: 0.9 }}
        >
          En <strong>Publicidad Mahur</strong> y{" "}
          <strong>Expo Belleza y Barberías</strong>, estamos comprometidos con
          la seguridad de tus datos. Al utilizar nuestro sitio, aceptas los
          siguientes términos clave:
        </Typography>

        <Box sx={{ display: "grid", gap: 4 }}>
          <section>
            <Typography
              variant='subtitle1'
              sx={{ color: brandCyan, fontWeight: 700, mb: 1 }}
            >
              1. INFORMACIÓN RECOGIDA
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Recopilamos tu nombre, correo electrónico e información
              profesional para procesar tu acceso al evento y enviarte
              actualizaciones relevantes.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{ color: brandCyan, fontWeight: 700, mb: 1 }}
            >
              2. USO Y SEGURIDAD
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Tus datos se utilizan para mejorar nuestros servicios y mantener
              un registro de asistentes. Implementamos los sistemas de seguridad
              más avanzados para evitar accesos no autorizados.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{ color: brandCyan, fontWeight: 700, mb: 1 }}
            >
              3. CONTROL DE DATOS
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Puedes cancelar tu suscripción a correos publicitarios en
              cualquier momento. No vendemos ni distribuimos tu información
              personal a terceros sin tu consentimiento.
            </Typography>
          </section>
        </Box>

        <Button
          fullWidth
          variant='contained'
          onClick={onClose}
          sx={{
            mt: 8,
            py: 2,
            bgcolor: brandCyan,
            color: darkPetroleum,
            fontWeight: 900,
            borderRadius: 4,
            "&:hover": { bgcolor: "#FFF" },
          }}
        >
          ENTENDIDO Y CERRAR
        </Button>
      </Container>
    </Dialog>
  );
};
