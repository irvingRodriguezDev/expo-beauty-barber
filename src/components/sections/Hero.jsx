import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WomenEbb from "../../assets/images/WONDER EBB.png";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B"; // Oscuridad total del esquema Midnight

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        // Fondo base mucho más profundo y elegante
        background: `radial-gradient(circle at 20% 30%, #064E57 0%, ${darkPetroleum} 100%)`,
        overflow: "hidden",
        pt: { xs: 12, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Glow tecnológico de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "50vw",
          height: "50vw",
          background: `radial-gradient(circle, rgba(114, 248, 255, 0.05) 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            gap: { xs: 6, lg: 4 },
            alignItems: "center",
          }}
        >
          {/* LADO IZQUIERDO: TEXTOS */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  letterSpacing: "0.6em",
                  color: brandCyan,
                  textTransform: "uppercase",
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                }}
              >
                ESTABLECIENDO EL ESTÁNDAR 2027
              </Typography>
            </motion.div>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: "3.5rem", sm: "5.5rem", lg: "8.5rem" },
                  lineHeight: 0.85,
                  fontWeight: 900,
                  fontFamily: "'Syne', sans-serif",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  mb: 2,
                }}
              >
                EXPO <br />
                <span
                  style={{
                    color: brandCyan,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  BELLEZA
                </span>
                <br /> BARBERÍAS
              </Typography>
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.2rem" },
                  maxWidth: 550,
                  mx: { xs: "auto", lg: 0 },
                  mb: 6,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Donde la maestría técnica se encuentra con el networking de alto
                nivel. Únete a la cumbre empresarial más influyente de la
                industria.
              </Typography>
            </motion.div>

            {/* Badges con Glassmorphism real */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 8 }}
            >
              {[
                { icon: <CalendarMonthIcon />, text: "05–06 FEB" },
                { icon: <LocationOnIcon />, text: "WTC CDMX" },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(114, 248, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Box
                    sx={{
                      color: brandCyan,
                      display: "flex",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      letterSpacing: "0.2em",
                      color: "#FFF",
                      fontFamily: "'Syne'",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <Button
                variant='contained'
                onClick={() => scrollTo("register")}
                sx={{
                  bgcolor: brandCyan,
                  color: darkPetroleum,
                  borderRadius: 0,
                  px: 6,
                  py: 2.5,
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  letterSpacing: "0.2em",
                  boxShadow: `0 10px 30px rgba(114, 248, 255, 0.3)`,
                  "&:hover": { bgcolor: "#FFF", transform: "translateY(-5px)" },
                  transition: "0.4s",
                }}
              >
                RESERVAR LUGAR
              </Button>
              <Button
                variant='outlined'
                onClick={() => scrollTo("expositores")}
                sx={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#FFF",
                  borderRadius: 0,
                  px: 6,
                  py: 2.5,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  "&:hover": { borderColor: brandCyan, color: brandCyan },
                  transition: "0.4s",
                }}
              >
                SER EXPOSITOR
              </Button>
            </Stack>
          </Box>

          {/* LADO DERECHO: IMAGEN ENMARCADA */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Box
                sx={{
                  width: { xs: "280px", md: "450px" },
                  aspectRatio: "4/5",
                  position: "relative",
                  "&::before": {
                    // Marco decorativo tecnológico
                    content: '""',
                    position: "absolute",
                    top: -20,
                    left: 20,
                    right: -20,
                    bottom: 20,
                    border: `1px solid ${brandCyan}`,
                    opacity: 0.3,
                    zIndex: -1,
                  },
                }}
              >
                <Box
                  component='img'
                  src={WomenEbb}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 0,
                    filter: "grayscale(20%) contrast(1.1)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                {/* Overlay de color sutil sobre la imagen */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(to top, ${darkPetroleum}, transparent)`,
                    opacity: 0.4,
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Indicador Scroll */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDownIcon sx={{ color: brandCyan, fontSize: 40 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
