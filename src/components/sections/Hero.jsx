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
        background: "linear-gradient(180deg, #F9A8D4 0%, #FAF8F5 100%)",
        overflow: "hidden",
        pt: { xs: 12, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Elementos Decorativos */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          right: "-10%",
          width: { xs: "100vw", md: "70vw" },
          height: { xs: "100vw", md: "70vw" },
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            gap: { xs: 4, lg: 2 },
            alignItems: "center",
          }}
        >
          {/* Contenido Izquierdo */}
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: { xs: "0.65rem", md: "0.75rem" },
                  fontWeight: 700,
                  letterSpacing: "0.5em",
                  color: "#BE185D",
                  textTransform: "uppercase",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", lg: "flex-start" },
                  gap: 2,
                  "&::after": {
                    content: '""',
                    width: { xs: "30px", md: "60px" },
                    height: "1px",
                    bgcolor: "#BE185D",
                  },
                }}
              >
                Edición 2027
              </Typography>
            </motion.div>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: {
                    xs: "3rem",
                    sm: "4.5rem",
                    md: "6rem",
                    lg: "8.5rem",
                  },
                  lineHeight: { xs: 0.9, md: 0.85 },
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: "#2D0A1A",
                  mb: 1,
                }}
              >
                EXPO <br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
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
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: { xs: "100%", lg: 500 },
                  mx: { xs: "auto", lg: 0 },
                  mb: 4,
                  color: "#7D4A5F",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Donde la pasión por el estilo se convierte en legado
                empresarial. Sé protagonista del inicio de una nueva era.
              </Typography>
            </motion.div>

            {/* Info Badges */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", lg: "flex-start" }}
              alignItems='center'
              gap={2}
              sx={{ mb: 5 }}
            >
              {[
                {
                  icon: <CalendarMonthIcon fontSize='small' />,
                  text: "5–6 Feb, 2027",
                },
                {
                  icon: <LocationOnIcon fontSize='small' />,
                  text: "WTC Ciudad de México",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 3,
                    py: 1.2,
                    bgcolor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    borderRadius: "100px",
                    width: { xs: "fit-content", sm: "auto" },
                  }}
                >
                  <Box sx={{ color: "#EC4899", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: "#2D0A1A",
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", lg: "flex-start" },
              }}
            >
              <Button
                variant='contained'
                onClick={() => scrollTo("register")}
                sx={{
                  bgcolor: "#2D0A1A",
                  color: "#FFF",
                  borderRadius: "30px",
                  px: { xs: 4, md: 6 },
                  py: 2,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#BE185D", transform: "scale(1.05)" },
                  transition: "0.3s",
                }}
              >
                QUIERO ASISTIR
              </Button>
            </Box>
          </Box>

          {/* Imagen Derecha */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mt: { xs: 2, lg: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Box
                sx={{
                  width: { xs: "260px", sm: "350px", md: "450px", lg: "100%" },
                  maxWidth: "550px",
                  aspectRatio: "4/5",
                  borderRadius: {
                    xs: "150px 150px 0 0",
                    md: "200px 200px 0 0",
                  },
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 20px 40px rgba(45,10,26,0.1)",
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
                    // Ajuste para que la imagen respire en el arco
                    pt: { xs: 4, md: 8 },
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* Scroll Down - Oculto en móviles muy pequeños para evitar ruido visual */}
      <Box
        onClick={() => scrollTo("visitantes")}
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: { xs: "none", md: "block" },
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <KeyboardArrowDownIcon sx={{ color: "#BE185D", fontSize: 30 }} />
        </motion.div>
      </Box>
    </Box>
  );
}
