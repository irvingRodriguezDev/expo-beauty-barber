import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WomenEbb from "../../assets/images/WONDER EBB.png";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        alignItems: "center",
        // NUEVO GRADIENTE: Esmeralda profundo a Champagne Hueso
        background: "linear-gradient(180deg, #062C22 0%, #668678 100%)",
        overflow: "hidden",
        pt: { xs: 12, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Elementos Decorativos Refinados */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: { xs: "100vw", md: "60vw" },
          height: { xs: "100vw", md: "60vw" },
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)", // Destello Dorado sutil
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            gap: { xs: 6, lg: 2 },
            alignItems: "center",
          }}
        >
          {/* Contenido Izquierdo */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: "0.7rem", md: "0.8rem" },
                  fontWeight: 800,
                  letterSpacing: "0.5em",
                  color: "#D4AF37", // DORADO: Sustituye al rosa para barbería
                  textTransform: "uppercase",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                  "&::after": {
                    content: '""',
                    width: "40px",
                    height: "1px",
                    bgcolor: "#D4AF37",
                  },
                }}
              >
                EDICIÓN 2027
              </Typography>
            </motion.div>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: {
                    xs: "3.2rem",
                    sm: "5rem",
                    md: "7rem",
                    lg: "8.5rem",
                  },
                  lineHeight: { xs: 0.9, md: 0.8 },
                  fontWeight: 900,
                  fontFamily: "'Syne', sans-serif",
                  color: "#FFFFFF", // BLANCO: Para contraste sobre el verde oscuro
                  mb: 1,
                  textShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                EXPO <br />
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#D4AF37", // DORADO: En la palabra clave
                  }}
                >
                  BELLEZA &
                </span>
                <br /> <span>BARBERÍAS</span>
              </Typography>
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  maxWidth: { xs: "100%", lg: 550 },
                  mx: { xs: "auto", lg: 0 },
                  mb: 5,
                  color: "rgba(255,255,255,0.8)", // Blanco suave para lectura
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                El epicentro donde la maestría técnica y el arte visual se
                fusionan. Eleva tu negocio en el evento más exclusivo de
                Latinoamérica.
              </Typography>
            </motion.div>

            {/* Info Badges Premium */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              alignItems='center'
              gap={2}
              sx={{ mb: 6 }}
            >
              {[
                {
                  icon: <CalendarMonthIcon fontSize='small' />,
                  text: "5–6 FEB, 2027",
                },
                {
                  icon: <LocationOnIcon fontSize='small' />,
                  text: "WTC CIUDAD DE MÉXICO",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 3,
                    py: 1.5,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "2px", // Look rectangular para barbería
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Box sx={{ color: "#D4AF37", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      color: "#FFFFFF",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Acciones de Alto Contraste */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <Button
                variant='contained'
                onClick={() => scrollTo("register")}
                sx={{
                  bgcolor: "#D4AF37", // DORADO
                  color: "#062C22", // TEXTO VERDE OSCURO
                  borderRadius: "0px", // Cambio a 0 para look arquitectónico/premium
                  px: 6,
                  py: 2.2,
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  letterSpacing: "0.15em",
                  "&:hover": {
                    bgcolor: "#FFFFFF",
                    transform: "translateY(-5px)",
                  },
                  transition: "0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
              >
                ADQUIRIR ACCESO
              </Button>
              <Button
                variant='outlined'
                onClick={() => scrollTo("expositores")}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  borderRadius: "0px",
                  px: 6,
                  py: 2.2,
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  fontFamily: "'Syne'",
                  letterSpacing: "0.15em",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    borderColor: "#D4AF37",
                    color: "#D4AF37",
                    transform: "translateY(-5px)",
                  },
                  transition: "0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                }}
              >
                QUIERO EXPONER
              </Button>
            </Stack>
          </Box>

          {/* Imagen Derecha con Arco Arquitectónico */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mt: { xs: 4, lg: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <Box
                sx={{
                  width: { xs: "280px", sm: "400px", lg: "480px" },
                  aspectRatio: "4/5",
                  // ARCO TIPO "PORTAL" (Muy de tendencia en diseño de interiores de lujo)
                  borderRadius: "240px 240px 0 0",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  p: 1, // Espacio para que el borde se vea como un marco
                }}
              >
                <Box
                  component='img'
                  src={WomenEbb}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "230px 230px 0 0",
                    filter: "contrast(1.05) brightness(1.02)",
                  }}
                />
              </Box>
            </motion.div>

            {/* Elemento decorativo detrás de la imagen */}
            <Box
              sx={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: "100%",
                height: "100%",
                border: "1px solid rgba(212, 175, 55, 0.1)",
                borderRadius: "240px 240px 0 0",
                zIndex: -1,
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Scroll Down INDICATOR */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: { xs: "none", md: "block" },
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <KeyboardArrowDownIcon
            sx={{ color: "#D4AF37", fontSize: 40, opacity: 0.6 }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
