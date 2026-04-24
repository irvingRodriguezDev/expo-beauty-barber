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
  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97";
  const deepText = "#3D2B2F";
  const softBg = "#FFD9E2";

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
      {/* Header Estilo Galería */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(61, 43, 47, 0.08)",
          position: "sticky",
          top: 0,
          bgcolor: softBg,
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            color: deepText,
            letterSpacing: 3,
            fontSize: "0.9rem",
            textTransform: "uppercase",
          }}
        >
          Compromiso de Privacidad
        </Typography>
        <IconButton onClick={onClose} sx={{ color: deepText }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Container maxWidth='md' sx={{ py: 8 }}>
        {/* Intro */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <GppGoodIcon
            sx={{ fontSize: 60, color: brandPink, mb: 2, opacity: 0.8 }}
          />
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              mb: 3,
              color: deepText,
            }}
          >
            Tus datos, <span style={{ color: brandPink }}>seguros.</span>
          </Typography>
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.8,
              color: "rgba(61, 43, 47, 0.7)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            En cumplimiento con los términos de{" "}
            <strong>Publicidad Mahur, S.A. de C.V.</strong> y
            <strong> Beauty World Mexico</strong>, detallamos nuestra política
            de protección de datos.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 6 }}>
          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandPink,
                fontWeight: 900,
                mb: 2,
                letterSpacing: 1.5,
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              01. INFORMACIÓN RECOGIDA
            </Typography>
            <Typography
              variant='body2'
              sx={{ lineHeight: 1.8, color: "rgba(61, 43, 47, 0.8)" }}
            >
              Recabamos datos personales esenciales para tu experiencia:{" "}
              <strong>
                Nombre completo, correo electrónico e información de perfil
                profesional.
              </strong>{" "}
              Esta información se utiliza exclusivamente para la gestión de tus
              accesos y comunicación del evento.
            </Typography>
          </section>

          <section>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 2 }}
            >
              <PaymentIcon sx={{ color: brandPink, fontSize: 20 }} />
              <Typography
                variant='subtitle1'
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                02. PAGOS Y SEGURIDAD BANCARIA
              </Typography>
            </Stack>
            <Typography
              variant='body2'
              sx={{ lineHeight: 1.8, color: "rgba(61, 43, 47, 0.8)" }}
            >
              Tu seguridad financiera es nuestra prioridad.{" "}
              <strong>
                No almacenamos los datos de tus tarjetas en nuestros servidores
              </strong>
              . Todas las transacciones son procesadas mediante{" "}
              <strong>Stripe</strong>, utilizando cifrado{" "}
              <strong>SSL de grado bancario</strong> y cumpliendo con los
              estándares PCI de nivel 1.
            </Typography>
          </section>

          <section>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ mb: 2 }}
            >
              <SecurityIcon sx={{ color: brandPink, fontSize: 20 }} />
              <Typography
                variant='subtitle1'
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                03. INFRAESTRUCTURA DE SEGURIDAD
              </Typography>
            </Stack>
            <Typography
              variant='body2'
              sx={{ lineHeight: 1.8, color: "rgba(61, 43, 47, 0.8)" }}
            >
              Implementamos protocolos avanzados de protección de datos en la
              nube para asegurar que no exista ningún acceso no autorizado,
              manteniendo la integridad de la base de datos de{" "}
              <strong>Beauty World Mexico</strong>.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandPink,
                fontWeight: 900,
                mb: 2,
                letterSpacing: 1.5,
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              04. USO DE COOKIES Y ANALÍTICA
            </Typography>
            <Typography
              variant='body2'
              sx={{ lineHeight: 1.8, color: "rgba(61, 43, 47, 0.8)" }}
            >
              Utilizamos cookies técnicas para optimizar la velocidad de carga
              de la plataforma y realizar análisis estadísticos anónimos que nos
              ayuden a mejorar tu experiencia de navegación.
            </Typography>
          </section>
        </Box>

        <Divider sx={{ my: 8, borderColor: "rgba(61, 43, 47, 0.08)" }} />

        <Stack alignItems='center' spacing={4}>
          <Button
            variant='contained'
            onClick={onClose}
            sx={{
              py: 2.5,
              px: 8,
              bgcolor: deepText,
              color: "#FFF",
              fontWeight: 900,
              borderRadius: 2,
              fontSize: "0.85rem",
              letterSpacing: 2,
              boxShadow: "0 20px 40px rgba(61, 43, 47, 0.15)",
              "&:hover": { bgcolor: brandPink, color: deepText },
            }}
          >
            HE LEÍDO Y ACEPTO LOS TÉRMINOS
          </Button>

          <Typography
            variant='caption'
            sx={{
              display: "block",
              textAlign: "center",
              color: "rgba(61, 43, 47, 0.4)",
              fontWeight: 700,
            }}
          >
            Última actualización: Abril 2026. <br />
            Sujeto a cambios bajo las normativas legales vigentes.
          </Typography>
        </Stack>
      </Container>
    </Dialog>
  );
};
