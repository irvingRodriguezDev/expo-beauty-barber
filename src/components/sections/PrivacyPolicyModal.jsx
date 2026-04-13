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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";

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
          borderBottom: "1px solid rgba(114, 248, 255, 0.2)",
          position: "sticky",
          top: 0,
          bgcolor: darkPetroleum,
          zIndex: 10,
        }}
      >
        <Typography
          variant='h6'
          sx={{ fontWeight: 800, color: brandCyan, letterSpacing: 2 }}
        >
          AVISO DE PRIVACIDAD
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#FFF" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Container maxWidth='md' sx={{ py: 6 }}>
        <Typography
          variant='body1'
          sx={{ mb: 4, lineHeight: 1.8, opacity: 0.9 }}
        >
          En cumplimiento con los términos de{" "}
          <strong>Publicidad Mahur, S.A. de C.V.</strong> y
          <strong> Expo Belleza y Barberías</strong>, informamos sobre el uso y
          protección de los datos proporcionados en{" "}
          <em>expobellezaybarberias.com</em>.
        </Typography>

        <Box sx={{ display: "grid", gap: 5 }}>
          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandCyan,
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              1. INFORMACIÓN RECOGIDA
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8, mb: 1 }}>
              Nuestro sitio recoge datos personales como:{" "}
              <strong>
                Nombre, correo electrónico e información demográfica.
              </strong>
              Asimismo, para el procesamiento de pedidos, facturación o
              entregas, se podrá requerir información específica adicional.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandCyan,
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PaymentIcon fontSize='small' /> 2. PAGOS Y SEGURIDAD BANCARIA
              (STRIPE)
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Para tu seguridad,{" "}
              <strong>
                no almacenamos los datos de tu tarjeta en nuestros servidores
              </strong>
              . Los pagos se procesan a través de
              <strong> Stripe</strong>, una plataforma con certificación PCI de
              nivel 1 (el estándar más alto). La conexión se realiza mediante
              <strong> certificados SSL</strong> que cifran tu información desde
              que la ingresas hasta que se procesa el pago.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{
                color: brandCyan,
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <SecurityIcon fontSize='small' /> 3. COMPROMISO DE SEGURIDAD
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Estamos altamente comprometidos con mantener su información
              segura. Empleamos los sistemas más avanzados y los actualizamos
              constantemente para asegurar que no exista ningún acceso no
              autorizado.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{ color: brandCyan, fontWeight: 700, mb: 1 }}
            >
              4. USO DE COOKIES
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              Empleamos cookies para identificar las páginas visitadas y su
              frecuencia, con fines exclusivamente de
              <strong> análisis estadístico</strong>, eliminando la información
              de forma permanente tras su uso. Puedes aceptar, negar o
              configurar el uso de cookies desde tu navegador en cualquier
              momento.
            </Typography>
          </section>

          <section>
            <Typography
              variant='subtitle1'
              sx={{ color: brandCyan, fontWeight: 700, mb: 1 }}
            >
              5. CONTROL Y TERCEROS
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.8 }}>
              • No vendemos, cedemos ni distribuimos tu información personal sin
              tu consentimiento, salvo requerimiento legal por un juez con orden
              judicial.
              <br />
              • Puedes cancelar suscripciones a correos publicitarios en
              cualquier momento.
              <br />• Enlaces a terceros: No somos responsables de la privacidad
              en sitios externos fuera de nuestro dominio.
            </Typography>
          </section>
        </Box>

        <Divider sx={{ my: 6, borderColor: "rgba(114, 248, 255, 0.1)" }} />

        <Button
          fullWidth
          variant='contained'
          onClick={onClose}
          sx={{
            py: 2,
            bgcolor: brandCyan,
            color: darkPetroleum,
            fontWeight: 900,
            borderRadius: 2,
            fontSize: "1rem",
            "&:hover": { bgcolor: "#FFF" },
          }}
        >
          HE LEÍDO Y ACEPTO LOS TÉRMINOS
        </Button>

        <Typography
          variant='caption'
          sx={{ display: "block", mt: 2, textAlign: "center", opacity: 0.5 }}
        >
          Última actualización: Abril 2026. Nos reservamos el derecho de cambiar
          los términos de esta política en cualquier momento[cite: 33].
        </Typography>
      </Container>
    </Dialog>
  );
};
