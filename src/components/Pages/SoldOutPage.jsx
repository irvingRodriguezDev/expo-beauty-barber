import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Chip,
  Stack,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const TARGET_DATE = new Date("2026-12-10T09:00:00-06:00").getTime();

const SoldOutEvent = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, TARGET_DATE - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = async () => {
    const address = "Av. Morelos 67, Col. Juárez, Cuauhtémoc, CDMX";
    try {
      await navigator.clipboard.writeText(address);
      setSnackbarOpen(true);
    } catch {
      setSnackbarOpen(true);
    }
  };

  const sparkles = [
    { top: "10%", left: "8%", size: 12, delay: "0s" },
    { top: "18%", right: "12%", size: 16, delay: "0.7s" },
    { top: "42%", left: "5%", size: 10, delay: "1.3s" },
    { top: "68%", right: "7%", size: 14, delay: "0.4s" },
    { bottom: "16%", left: "14%", size: 15, delay: "1.1s" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "radial-gradient(circle at 50% 18%, rgba(229, 56, 136, 0.08) 0%, rgba(255, 245, 248, 0.65) 38%, #FFFFFF 75%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        boxSizing: "border-box",
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
      }}
    >
      {/* Destellos decorativos elegantes en rosa y dorado champán */}
      <Box
        sx={{
          position: "absolute",
          top: "-140px",
          left: "-120px",
          width: "460px",
          height: "460px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(229, 56, 136, 0.11) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-150px",
          right: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(197, 160, 89, 0.14) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {sparkles.map((sp, idx) => (
        <Box
          key={idx}
          sx={{
            position: "absolute",
            top: sp.top,
            left: sp.left,
            right: sp.right,
            bottom: sp.bottom,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            color: idx % 2 === 0 ? "#E53888" : "#C5A059",
            opacity: 0.55,
            pointerEvents: "none",
            zIndex: 1,
            "@keyframes floatSparkle": {
              "0%, 100%": { transform: "translateY(0px) scale(1)" },
              "50%": { transform: "translateY(-7px) scale(1.15)" },
            },
            animation: `floatSparkle 3.4s ease-in-out ${sp.delay} infinite`,
          }}
        >
          ✦
        </Box>
      ))}

      {/* Contenido Principal */}
      <Container
        maxWidth='md'
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2.5, sm: 3.5 },
        }}
      >
        {/* Badge de Marca */}
        <Chip
          label='WAPIZIMA • CHRISTMAS NAILS'
          sx={{
            backgroundColor: "#FFF5F8",
            color: "#E53888",
            border: "1px solid rgba(229, 56, 136, 0.25)",
            fontWeight: 700,
            fontSize: { xs: "0.68rem", sm: "0.78rem" },
            letterSpacing: "2.2px",
            px: 1.5,
            py: 2.2,
            borderRadius: "999px",
            boxShadow: "0 6px 20px rgba(229, 56, 136, 0.07)",
          }}
        />

        {/* Título Principal */}
        <Box sx={{ my: 0.5 }}>
          <Typography
            component='h1'
            sx={{
              fontSize: { xs: "2.5rem", sm: "4.4rem", md: "5.5rem" },
              fontWeight: 900,
              color: "#2B1E22",
              lineHeight: 0.96,
              letterSpacing: "-1.5px",
              textTransform: "uppercase",
            }}
          >
            CHRISTMAS NAILS
          </Typography>
          <Typography
            component='div'
            sx={{
              fontSize: { xs: "3.4rem", sm: "5.6rem", md: "7rem" },
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: "-1px",
              fontStyle: "italic",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #E53888 15%, #C5A059 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              px: 1.5,
            }}
          >
            SOLD OUT
          </Typography>
        </Box>

        {/* Mensaje de Fecha y Sede */}
        <Typography
          sx={{
            color: "#2B1E22",
            fontSize: { xs: "1.15rem", sm: "1.5rem" },
            fontWeight: 700,
            lineHeight: 1.4,
            maxWidth: "680px",
          }}
        >
          Nos vemos este{" "}
          <Box
            component='span'
            sx={{
              color: "#E53888",
              fontWeight: 800,
            }}
          >
            10 y 11 de diciembre
          </Box>{" "}
          en{" "}
          <Box
            component='span'
            sx={{
              borderBottom: "2.5px solid #C5A059",
              pb: "2px",
            }}
          >
            Expo Reforma
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#6C5B60",
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            maxWidth: "560px",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          ¡Boletos agotados!
          <br /> Gracias por hacer de esta edición navideña un evento
          inolvidable.
          <br /> Si ya tienes tu pase o deseas verificar tu acceso, haz clic
          abajo.
        </Typography>

        {/* Botones de Acción */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems='center'
          justifyContent='center'
          sx={{ mt: 0.5, width: "100%" }}
        >
          <Link to='/mis-boletos'>
            <Button
              variant='contained'
              // onClick={() => setModalOpen(true)}
              sx={{
                background: "linear-gradient(135deg, #E53888 0%, #C8236E 100%)",
                color: "#FFFFFF",
                borderRadius: "999px",
                px: { xs: 4, sm: 5 },
                py: 1.75,
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                boxShadow: "0 12px 28px rgba(229, 56, 136, 0.32)",
                transition: "all 0.25s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #D82E7A 0%, #AD1A5D 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 16px 34px rgba(229, 56, 136, 0.42)",
                },
              }}
            >
              Busca tus boletos aquí
            </Button>
          </Link>
        </Stack>

        {/* Cuenta Regresiva + Tarjeta de Sede Expo Reforma */}
        <Grid container spacing={2.5} sx={{ mt: 1, textAlign: "left" }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                height: "100%",
                borderRadius: "22px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(229, 56, 136, 0.16)",
                boxShadow: "0 10px 30px rgba(43, 30, 34, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "1.8px",
                  color: "#E53888",
                  textTransform: "uppercase",
                  mb: 1.5,
                }}
              >
                Cuenta regresiva • 10 de diciembre
              </Typography>

              <Grid container spacing={1.2}>
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item) => (
                  <Grid item xs={3} key={item.label}>
                    <Box
                      sx={{
                        backgroundColor: "#FFF5F8",
                        border: "1px solid rgba(197, 160, 89, 0.28)",
                        borderRadius: "14px",
                        py: 1.2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "1.2rem", sm: "1.45rem" },
                          color: "#2B1E22",
                          lineHeight: 1.1,
                        }}
                      >
                        {String(item.value).padStart(2, "0")}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: "#8C767C",
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                          mt: 0.3,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                height: "100%",
                borderRadius: "22px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(197, 160, 89, 0.32)",
                boxShadow: "0 10px 30px rgba(43, 30, 34, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "1.8px",
                    color: "#C5A059",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Sede Oficial • CDMX
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#2B1E22",
                  }}
                >
                  Expo Reforma
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    color: "#6C5B60",
                    mt: 0.3,
                  }}
                >
                  Av. Morelos 67, Col. Juárez, Cuauhtémoc, CDMX
                </Typography>
              </Box>

              <Stack direction='row' spacing={1} flexWrap='wrap'>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={handleCopyAddress}
                  sx={{
                    borderRadius: "999px",
                    borderColor: "rgba(197, 160, 89, 0.55)",
                    color: "#2B1E22",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#C5A059",
                      backgroundColor: "#FFF9EE",
                    },
                  }}
                >
                  Copiar dirección
                </Button>
                <Button
                  size='small'
                  variant='text'
                  component='a'
                  href='https://maps.google.com/?q=Expo+Reforma+Av+Morelos+67+CDMX'
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{
                    borderRadius: "999px",
                    color: "#E53888",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#FFF5F8",
                    },
                  }}
                >
                  Ver en Maps ↗
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        component='footer'
        sx={{
          position: "relative",
          zIndex: 2,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant='caption'
          sx={{
            color: "#8E7B80",
            fontWeight: 600,
            letterSpacing: "1.6px",
            fontSize: "0.75rem",
          }}
        >
          WAPIZIMA © 2026 • CHRISTMAS NAILS • 10 Y 11 DE DICIEMBRE • EXPO
          REFORMA
        </Typography>
      </Box>

      {/* Modal: Busca tus boletos aquí */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        message='Dirección de Expo Reforma copiada'
      />
    </Box>
  );
};

export default SoldOutEvent;
