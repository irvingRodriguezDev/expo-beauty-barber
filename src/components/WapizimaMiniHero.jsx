import React from "react";
import { Box, Typography, Button, Container, Chip, Stack } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export const WapizimaMiniHero = () => {
  return (
    <Box
      component='section'
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 3, md: 4 },
        backgroundColor: "#0a0a0c",
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(225, 29, 116, 0.25) 0%, transparent 50%),
          radial-gradient(circle at 10% 80%, rgba(139, 9, 74, 0.2) 0%, transparent 45%)
        `,
        border: "1px solid rgba(225, 29, 116, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        py: { xs: 4, md: 5 },
        px: { xs: 3, md: 6 },
        my: 3,
      }}
    >
      {/* Sombra de acento magenta decorativa detrás */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "#e11d74",
          filter: "blur(80px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth='lg' disableGutters>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent='space-between'
        >
          {/* Bloque de Texto e Identidad */}
          <Box sx={{ maxWidth: { xs: "100%", md: "650px" }, zIndex: 1 }}>
            <Chip
              icon={
                <EventAvailableIcon
                  sx={{ color: "#e11d74 !important", fontSize: 16 }}
                />
              }
              label='TEMPORADA 2026 • ÉLITE'
              size='small'
              sx={{
                backgroundColor: "rgba(225, 29, 116, 0.1)",
                color: "#ff66ab",
                borderColor: "rgba(225, 29, 116, 0.3)",
                borderWidth: 1,
                borderStyle: "solid",
                fontWeight: 700,
                letterSpacing: 1.2,
                fontSize: "0.72rem",
                mb: 2,
              }}
            />

            <Typography
              variant='h3'
              component='h1'
              sx={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
                lineHeight: 1.15,
                fontFamily: '"Montserrat", "Poppins", sans-serif',
                letterSpacing: "-0.02em",
                mb: 1.5,
              }}
            >
              Donde tu pasión se convierte en{" "}
              <Box
                component='span'
                sx={{
                  background:
                    "linear-gradient(90deg, #ff4097 0%, #e11d74 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                arte
              </Box>
            </Typography>

            <Typography
              variant='body1'
              sx={{
                color: "#b0b3c6",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              Espacios diseñados para inspirar, conectar y acelerar tu
              crecimiento profesional en la industria del <i>nail art</i> en
              México.
            </Typography>
          </Box>

          {/* Acciones Rápidas */}
          <Stack
            direction={{ xs: "row", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" }, zIndex: 1 }}
          >
            <Button
              variant='contained'
              disableElevation
              sx={{
                background: "linear-gradient(135deg, #e11d74 0%, #be125a 100%)",
                color: "#ffffff",
                fontWeight: 700,
                px: 3.5,
                py: 1.3,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: "0.95rem",
                boxShadow: "0 4px 18px rgba(225, 29, 116, 0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f02880 0%, #d11565 100%)",
                  boxShadow: "0 6px 22px rgba(225, 29, 116, 0.6)",
                },
              }}
            >
              Explorar Eventos
            </Button>

            <Button
              variant='outlined'
              sx={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                fontWeight: 600,
                px: 3,
                py: 1.3,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: "0.95rem",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  borderColor: "#e11d74",
                  backgroundColor: "rgba(225, 29, 116, 0.08)",
                },
              }}
            >
              Mis Boletos
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
