import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Container, Typography, Button, Chip } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MicIcon from "@mui/icons-material/Mic";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const perks = [
  { Icon: ContentCutIcon, label: "Barber Shows en vivo" },
  { Icon: AutoAwesomeIcon, label: "Zona de maquillaje profesional" },
  { Icon: MicIcon, label: "Conferencias con expertos" },
  { Icon: ShoppingBagIcon, label: "Productos y ofertas exclusivas" },
  { Icon: CameraAltIcon, label: "Contenido para redes sociales" },
  { Icon: GroupsIcon, label: "Networking con profesionales" },
];

const profiles = [
  "Profesionales de la belleza",
  "Barberos",
  "Maquilladores",
  "Estudiantes de academias",
  "Dueños de salones",
  "Distribuidores",
  "Emprendedores del sector",
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Visitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: 16,
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant='overline'
            display='block'
            sx={{ mb: 2, color: "#E8407A" }}
          >
            Sección visitantes
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              color: "#F5F0E8",
              mb: 0.5,
            }}
          >
            Vive la experiencia
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              color: "#E8407A",
              mb: 8,
            }}
          >
            Expo Beauty & Barber
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 10,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box
              sx={{
                aspectRatio: "4/3",
                overflow: "hidden",
                mb: 4,
                position: "relative",
                background: "#1A1A1A",
              }}
            >
              <Box
                component='img'
                src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80'
                alt='Visitantes'
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.65,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, #0D0D0D, transparent)",
                }}
              />
            </Box>
            <Typography variant='body1' sx={{ mb: 4 }}>
              Durante{" "}
              <Box component='span' sx={{ color: "#F5F0E8", fontWeight: 600 }}>
                3 días
              </Box>{" "}
              podrás conocer las últimas tendencias, productos y técnicas de la
              industria de la belleza y barbería.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 0,
              }}
            >
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 2,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <p.Icon
                      sx={{ color: "#E8407A", fontSize: 14, flexShrink: 0 }}
                    />
                    <Typography variant='caption' sx={{ color: "#ABABAB" }}>
                      {p.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box
              sx={{
                border: "1px solid rgba(255,255,255,0.08)",
                p: 5,
                mb: 4,
                background: "#141414",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(232,64,122,0.12), transparent)",
                  transform: "translate(30%,-30%)",
                }}
              />
              <Typography
                variant='caption'
                sx={{
                  color: "#666",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  display: "block",
                  mb: 1,
                }}
              >
                Fecha y sede
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "5.5rem",
                  color: "#F5F0E8",
                  lineHeight: 0.9,
                }}
              >
                14–16
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  color: "#E8407A",
                  letterSpacing: "0.1em",
                  mt: 0.5,
                }}
              >
                Marzo 2026
              </Typography>
              <Typography variant='body2' sx={{ mt: 1.5 }}>
                WTC Ciudad de México
              </Typography>
            </Box>

            <Typography variant='overline' display='block' sx={{ mb: 2 }}>
              ¿Quién debería asistir?
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 5 }}>
              {profiles.map((p, i) => (
                <Chip
                  key={i}
                  label={p}
                  variant='outlined'
                  size='small'
                  sx={{
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "#ABABAB",
                    borderRadius: 0,
                    fontSize: "0.7rem",
                  }}
                />
              ))}
            </Box>

            <Button
              variant='contained'
              color='secondary'
              fullWidth
              size='large'
              startIcon={<ConfirmationNumberIcon />}
              onClick={() => scrollTo("registro")}
            >
              Registrarme como visitante
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
