import { Box, Container, Typography, Divider, IconButton } from "@mui/material";

import LogoRosa from "../../assets/logolargorosa.png";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import LocationIcon from "../icons/LocationIcon";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        pt: 10,
        pb: 4,
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 6,
            mb: 8,
          }}
        >
          {/* Brand */}
          <Box>
            {/* <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.8rem",
                letterSpacing: "0.08em",
                background:
                  "linear-gradient(135deg, #E040A0, #E8C96A, #E040A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                mb: 1.5,
              }}
            >
              Expo Beauty
              <br />& Barber Emprende
            </Typography> */}
            <img src={LogoRosa} width='100%' />
            <Typography variant='body2' sx={{ color: "#777", lineHeight: 1.7 }}>
              El punto de encuentro para la industria de la belleza, barbería y
              maquillaje en México.
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#444",
                mt: 2,
              }}
            >
              Organizado por Publicidad Mahur
            </Typography>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography variant='overline' display='block' sx={{ mb: 3 }}>
              Contacto
            </Typography>
            {[
              {
                Icon: <MailIcon width={40} />,
                text: "contacto@expobeautybarber.com",
              },
              { Icon: <PhoneIcon width={40} />, text: "WhatsApp Ventas" },
              {
                Icon: <LocationIcon width={40} />,
                text: "WTC Ciudad de México\nMontecito 38, Nápoles",
              },
            ].map(({ Icon, text }, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                {Icon}
                <Typography variant='body2' sx={{ whiteSpace: "pre-line" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Fecha */}
          <Box>
            <Typography variant='overline' display='block' sx={{ mb: 3 }}>
              Fecha y sede
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "5rem",
                color: "#F5F0E8",
                lineHeight: 0.9,
                mb: 0.5,
              }}
            >
              14–16
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.5rem",
                color: "#E8407A",
                letterSpacing: "0.1em",
              }}
            >
              Marzo 2026
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              <InstagramIcon width={40} />
              <FacebookIcon width={40} />
            </Box>
          </Box>
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant='caption'>
            © 2026 Expo Beauty & Barber Emprende. Todos los derechos reservados.
          </Typography>
          <Typography
            component='a'
            href='#'
            variant='caption'
            sx={{
              color: "#444",
              textDecoration: "none",
              "&:hover": { color: "#777" },
            }}
          >
            Política de Privacidad
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
