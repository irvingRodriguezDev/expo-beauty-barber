import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WomenEbb from "../../assets/images/WONDER EBB.webp";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  // --- PALETA COHERENTE CON NAVBAR Y FOOTER ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // --------------------------------------------

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        // Gradiente ligero y elegante
        background: `#FFD9E2`,
        overflow: "hidden",
        pt: { xs: 15, md: 12 }, // Más padding arriba para no chocar con el navbar claro
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Decoración sutil de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, rgba(255, 183, 206, 0.12) 0%, transparent 70%)`,
          filter: "blur(80px)",
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
                  fontSize: "0.75rem",
                  fontWeight: 900,
                  letterSpacing: "0.6em",
                  color: "#3D2B2F",
                  bgcolor: "#FFCBDA", // Usando el rosa más oscuro que pidió el cliente
                  textTransform: "uppercase",
                  mb: 4,
                  // --- CAMBIOS CLAVE ---
                  display: "inline-block", // Esto hace que el fondo se ajuste al texto
                  px: 1.5, // Padding lateral para que respire el resaltado
                  py: 0.5, // Un poco de padding arriba/abajo
                  width: "fit-content", // Asegura que no se estire
                  // ---------------------
                  alignItems: "center",
                  gap: 2,
                }}
              >
                ESTABLECIENDO EL ESTÁNDAR 2027
              </Typography>
            </motion.div>

            <Box sx={{ mb: 4 }}>
              <Typography
                component='h1'
                variant='h1'
                sx={{
                  fontSize: { xs: "3.5rem", sm: "5.5rem", lg: "8.5rem" },
                  lineHeight: 0.85,
                  fontWeight: 900,
                  // fontFamily: "'Syne', sans-serif",
                  color: deepText, // Texto oscuro sobre fondo claro
                  letterSpacing: "-0.02em",
                  mb: 2,
                }}
              >
                {" "}
                BEAUTY
                <br />
                <span
                  style={{
                    color: brandPink,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  WORLD
                </span>
                <br /> MEXICO
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
                  color: "rgba(61, 43, 47, 0.7)", // Texto descriptivo suave
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                Donde la maestría técnica se encuentra con el networking de alto
                nivel. Únete a la cumbre empresarial más influyente de la
                industria en México.
              </Typography>
            </motion.div>

            {/* Badges de Info */}
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
                    borderRadius: 2,
                    bgcolor: "#FFF",
                    border: `1px solid rgba(255, 183, 206, 0.3)`,
                    boxShadow: "0 4px 15px rgba(255, 183, 206, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      color: brandPink,
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
                      color: deepText,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Acciones */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <Button
                variant='contained'
                onClick={() => scrollTo("register")}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: 2,
                  px: 6,
                  py: 2.5,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  boxShadow: `0 10px 30px rgba(255, 183, 206, 0.4)`,
                  "&:hover": {
                    bgcolor: deepText,
                    color: "#FFF",
                    transform: "translateY(-5px)",
                  },
                  transition: "0.4s",
                }}
              >
                RESERVAR LUGAR
              </Button>
              <Button
                variant='outlined'
                onClick={() => scrollTo("expositores")}
                sx={{
                  borderColor: "rgba(61, 43, 47, 0.2)",
                  color: deepText,
                  borderRadius: 2,
                  px: 6,
                  py: 2.5,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  "&:hover": {
                    borderColor: brandPink,
                    color: brandPink,
                    bgcolor: "rgba(255, 183, 206, 0.05)",
                  },
                  transition: "0.4s",
                }}
              >
                SER EXPOSITOR
              </Button>
            </Stack>
          </Box>

          {/* LADO DERECHO: IMAGEN */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
              mt: { xs: 0, lg: 10 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <Box
                component='img'
                src={WomenEbb}
                loading='eager'
                alt='BEAUTY WORLD MEXICO 2027 WTC'
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: { xs: 500, lg: "100%" },
                  objectFit: "cover",
                  borderRadius: 2, // Un poco de redondeo suaviza la estética boutique
                  filter: "contrast(1.05)",
                  // boxShadow: "0 20px 40px rgba(61, 43, 47, 0.1)",
                }}
              />
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
          <KeyboardArrowDownIcon sx={{ color: brandPink, fontSize: 40 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
