import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Box, Typography, Button, Grid, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import reformaLimpio from "../../assets/images/reforma_fondo_limpio.png";

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // --- PALETA COHERENTE ---
  const brandPink = "#EE6F97"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  const lightBg = "#FFD9E2"; // Fondo crema rosado
  // -------------------------

  const mapUrl = "https://maps.app.goo.gl/pgzjTjSGfuqcHhiA6";

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: { xs: 8, md: 16 },
        px: { xs: 2, md: 6 },
        background: lightBg,
        position: "relative",
        overflow: "hidden",
        // CAPA DE LA IMAGEN
        "&::before": {
          content: '""',
          position: "absolute",
          top: { xs: -50, md: -100 },
          left: { xs: -80, md: -150 },
          right: 0,
          bottom: 0,
          backgroundImage: `url(${reformaLimpio})`,
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: 0.55,
          zIndex: 0,
        },
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        alignItems='center'
        sx={{ position: "relative", zIndex: 1 }}
      >
        {/* TEXTO INFORMATIVO */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-end" },
            textAlign: { xs: "center", md: "end" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", maxWidth: 500 }}
          >
            <Chip
              label='1.ª EDICIÓN • UBICACIÓN PRESTIGIO'
              sx={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                color: deepText,
                bgcolor: "#FFCBDA",
                mb: 2,
                borderRadius: "4px",
                px: 1,
              }}
            />

            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
                fontWeight: 800,
                color: deepText,
                lineHeight: 1.1,
                mb: 1,
              }}
            >
              EXPO BEAUTY BUSINESS
            </Typography>

            <Typography
              variant='h3'
              sx={{
                fontSize: { xs: "1.5rem", md: "2.2rem" },
                fontStyle: "italic",
                fontWeight: 400,
                color: brandPink,
                mb: 3,
              }}
            >
              Expo Reforma, CDMX
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "rgba(61, 43, 47, 0.8)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              El punto de encuentro exclusivo para la élite de la industria de
              la belleza. Una sede icónica en el corazón financiero y cultural
              de la ciudad.
            </Typography>

            {/* Bloque de Dirección */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", md: "flex-end" },
                justifyContent: { xs: "center", md: "flex-end" },
                gap: 1.5,
                mb: 4,
              }}
            >
              <Box sx={{ textAlign: { xs: "center", md: "end" } }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: deepText,
                    letterSpacing: "0.05em",
                    fontSize: "1rem",
                  }}
                >
                  AV. MORELOS 67
                </Typography>
                <Typography
                  sx={{ color: "rgba(61, 43, 47, 0.7)", fontSize: "0.875rem" }}
                >
                  Col. Juárez, Alc. Cuauhtémoc, CP 06600, CDMX.
                </Typography>
              </Box>
              <LocationOnIcon
                sx={{
                  color: brandPink,
                  fontSize: 28,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>

            <Button
              component='a'
              href={mapUrl}
              target='_blank'
              rel='noopener noreferrer'
              variant='outlined'
              endIcon={<OpenInNewIcon />}
              sx={{
                borderRadius: "8px",
                borderColor: deepText,
                color: deepText,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                letterSpacing: "0.12em",
                borderWidth: "1.5px",
                "&:hover": {
                  borderWidth: "1.5px",
                  borderColor: brandPink,
                  color: brandPink,
                  bgcolor: "rgba(255, 255, 255, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              ABRIR EN GOOGLE MAPS
            </Button>
          </motion.div>
        </Grid>

        {/* TARJETA VISUAL SUSTITUTA DEL MAPA */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                position: "relative",
                mx: "auto",
                maxWidth: 480,
                bgcolor: "#FFFFFF",
                borderRadius: "16px",
                p: { xs: 3, md: 4 },
                boxShadow: "0 20px 50px rgba(61, 43, 47, 0.08)",
                border: "1px solid rgba(238, 111, 151, 0.2)",
              }}
            >
              {/* Marco de Acento Rosa */}
              <Box
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 60,
                  height: 60,
                  borderTopRightRadius: 16,
                  borderTop: `3px solid ${brandPink}`,
                  borderRight: `3px solid ${brandPink}`,
                  pointerEvents: "none",
                }}
              />

              <Typography
                variant='h6'
                sx={{
                  fontWeight: 800,
                  color: deepText,
                  mb: 2,
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                }}
              >
                ¿CÓMO LLEGAR A LA EXPO?
              </Typography>

              {/* Puntos de Referencia Prácticos */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <DirectionsSubwayIcon sx={{ color: brandPink, mt: 0.3 }} />
                  <Box>
                    <Typography
                      variant='subtitle2'
                      sx={{ fontWeight: 700, color: deepText }}
                    >
                      En Transporte Público / Metro
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: "rgba(61, 43, 47, 0.7)" }}
                    >
                      A 5 min caminando de Metro Juárez (L3) o Metrobús Expo
                      Reforma (L4).
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <LocationOnIcon sx={{ color: brandPink, mt: 0.3 }} />
                  <Box>
                    <Typography
                      variant='subtitle2'
                      sx={{ fontWeight: 700, color: deepText }}
                    >
                      Puntos de Referencia
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: "rgba(61, 43, 47, 0.7)" }}
                    >
                      A una cuadra de Paseo de la Reforma y Glorieta de
                      Cuitláhuac.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Botón Prominente para Obtener Ruta */}
              <Button
                component='a'
                href={mapUrl}
                target='_blank'
                rel='noopener noreferrer'
                fullWidth
                variant='contained'
                sx={{
                  bgcolor: brandPink,
                  color: "#FFFFFF",
                  py: 1.6,
                  borderRadius: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  boxShadow: "0 8px 20px rgba(238, 111, 151, 0.3)",
                  "&:hover": {
                    bgcolor: deepText,
                    color: "#fff",
                    boxShadow: "0 10px 25px rgba(61, 43, 47, 0.25)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                TRAZAR RUTA EN MI NAVEGADOR
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
