import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  Slide,
  IconButton,
  Container,
  Divider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";
import GppGoodIcon from "@mui/icons-material/GppGood";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const PrivacyPolicyModal = ({ open, onClose }) => {
  // --- PALETA COHERENTE WAPIZIMA ---
  const brandPink = "#E53888"; // El rosa vibrante que usamos en los botones
  const deepText = "#3D2B2F";
  const softBg = "#FFF5F8"; // Un fondo rosado mucho más sutil y limpio

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          bgcolor: softBg,
          backgroundImage: "none",
          color: deepText,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(229, 56, 136, 0.1)",
          position: "sticky",
          top: 0,
          bgcolor: "rgba(255, 245, 248, 0.8)",
          backdropFilter: "blur(15px)",
          zIndex: 10,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            color: brandPink,
            letterSpacing: 2,
            fontSize: "0.8rem",
            textTransform: "uppercase",
          }}
        >
          Compromiso Wapizima
        </Typography>
        <IconButton onClick={onClose} sx={{ color: deepText }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Container maxWidth='md' sx={{ py: { xs: 4, md: 8 } }}>
        {/* Intro */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <GppGoodIcon sx={{ fontSize: 50, color: brandPink, mb: 2 }} />
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              mb: 2,
              color: deepText,
              fontFamily: "'Syne', sans-serif",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Tu privacidad es{" "}
            <span style={{ color: brandPink }}>nuestra prioridad.</span>
          </Typography>
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.6,
              color: "rgba(61, 43, 47, 0.7)",
              maxWidth: "600px",
              mx: "auto",
              fontSize: "1rem",
            }}
          >
            A través de nuestra plataforma oficial de boletaje, detallamos cómo
            protegemos tu información y garantizamos una transacción segura en
            cada uno de nuestros eventos.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 5 }}>
          {/* Sección 01 */}
          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandPink,
                fontWeight: 900,
                mb: 1.5,
                letterSpacing: 1,
                fontSize: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              01. DATOS DE REGISTRO
            </Typography>
            <Typography
              variant='body2'
              sx={{
                lineHeight: 1.7,
                color: "rgba(61, 43, 47, 0.8)",
                fontSize: "0.9rem",
              }}
            >
              Recabamos únicamente la información estrictamente necesaria para
              validar tu acceso:{" "}
              <strong>
                Nombre completo, correo electrónico y datos de contacto
                profesional.
              </strong>{" "}
              Estos datos se utilizan de forma exclusiva para generar tu boleto
              digital, enviar tus comprobantes de pago y notificarte sobre
              actualizaciones o cambios importantes del evento adquirido.
            </Typography>
          </section>

          {/* Sección 02 */}
          <section>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 1.5 }}
            >
              <PaymentIcon sx={{ color: brandPink, fontSize: 18 }} />
              <Typography
                variant='subtitle1'
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  letterSpacing: 1,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                02. COMPRA SEGURA (STRIPE)
              </Typography>
            </Stack>
            <Typography
              variant='body2'
              sx={{
                lineHeight: 1.7,
                color: "rgba(61, 43, 47, 0.8)",
                fontSize: "0.9rem",
              }}
            >
              <strong>
                Wapizima no almacena, no procesa ni tiene acceso a tus datos
                bancarios o tarjetas de crédito/débito.
              </strong>{" "}
              Todo el proceso de pago se delega de forma directa a{" "}
              <strong>Stripe</strong>, una de las pasarelas de pago líderes a
              nivel mundial, operando bajo rigurosos protocolos de cifrado SSL y
              estándares de seguridad PCI-DSS de grado bancario.
            </Typography>
          </section>

          {/* Sección 03 */}
          <section>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 1.5 }}
            >
              <SecurityIcon sx={{ color: brandPink, fontSize: 18 }} />
              <Typography
                variant='subtitle1'
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  letterSpacing: 1,
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                03. PROTECCIÓN Y VALIDEZ DEL BOLETO
              </Typography>
            </Stack>
            <Typography
              variant='body2'
              sx={{
                lineHeight: 1.7,
                color: "rgba(61, 43, 47, 0.8)",
                fontSize: "0.9rem",
              }}
            >
              Cada boleto digital emitido es personal, único e intransferible.
              Nuestro sistema de seguridad encripta los datos de compra en un
              **código QR dinámico** asignado a tu orden, asegurando un control
              de acceso ágil, blindado y protegido frente a cualquier intento de
              falsificación o duplicidad en la entrada del recinto.
            </Typography>
          </section>
        </Box>

        <Divider sx={{ my: 6, borderColor: "rgba(229, 56, 136, 0.1)" }} />

        <Stack alignItems='center' spacing={3}>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{
              py: 2,
              px: 6,
              bgcolor: brandPink,
              color: "#FFF",
              fontWeight: 900,
              borderRadius: "50px",
              fontSize: "0.9rem",
              textTransform: "none", // Se ve más moderno e internacional sin el uppercase forzado
              boxShadow: `0 15px 35px rgba(229, 56, 136, 0.3)`,
              "&:hover": { bgcolor: deepText, color: "#fff" },
              transition: "all 0.3s ease",
            }}
          >
            Entendido y Aceptar
          </Button>

          <Typography
            variant='caption'
            sx={{
              textAlign: "center",
              color: "rgba(61, 43, 47, 0.4)",
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: 0.5,
            }}
          >
            Última actualización: Junio 2026. <br />
            Para dudas adicionales o aclaraciones, contacta a nuestro equipo de
            soporte técnico oficial.
          </Typography>
        </Stack>
      </Container>
    </Dialog>
  );
};
