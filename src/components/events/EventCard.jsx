import React, { useState } from "react";
import { Box, Typography, Button, Grid, Stack, Paper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlaceIcon from "@mui/icons-material/Place";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Link } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import { formatMexicanCurrency } from "../../utils/FormatCurrency";
import PurchaseModal from "../purchases/PurchaseModal";

export default function EventCard({
  evento,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const isAgotado = evento.is_sold_out || false;
  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleClickOpenPurchase = (evt) => {
    if (isAgotado) return;
    setOpenPurchase(true);
    setSelectedEvent(evt);
  };

  const handleClosePurchase = () => {
    setOpenPurchase(false);
    setSelectedEvent(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        borderRadius: "24px",
        bgcolor: "#FFF",
        p: { xs: 2.5, sm: 3 },
        boxShadow: "0 8px 25px rgba(61, 43, 47, 0.06)",
        border: "1px solid rgba(61, 43, 47, 0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 14px 35px rgba(61, 43, 47, 0.12)",
        },
      }}
    >
      <Grid container spacing={2.5}>
        {/* FLYER */}
        <Grid item xs={12}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "16px",
              overflow: "hidden",
              bgcolor: "rgba(61, 43, 47, 0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {evento.flyer ? (
              <Box
                component='img'
                src={evento.flyer}
                alt={evento.titulo || "Flyer"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <LocalActivityIcon
                sx={{ fontSize: "3.5rem", color: `${brandPink}40` }}
              />
            )}

            {isAgotado && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(30, 20, 22, 0.7)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFF",
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    border: "2px solid #FFF",
                    px: 2.5,
                    py: 0.6,
                    borderRadius: "8px",
                    transform: "rotate(-5deg)",
                  }}
                >
                  Agotado
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* DETALLES Y CTAS */}
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* 1. TÍTULO */}
            <Typography
              component='h2'
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.35rem", md: "1.45rem" },
                fontWeight: 900,
                color: deepText,
                lineHeight: 1.25,
                textTransform: "uppercase",
                mb: 2,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {evento.titulo || evento.nombre}
            </Typography>

            {/* 2. FECHA Y UBICACIÓN (Contenedor estructurado) */}
            <Stack spacing={1.2} sx={{ mb: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  gap: 1,
                }}
              >
                <CalendarMonthIcon
                  sx={{ fontSize: "1.1rem", color: brandPink, flexShrink: 0 }}
                />
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 700, color: deepText, lineHeight: 1.2 }}
                >
                  {FormatDate(evento.fecha)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "flex-start" },
                  gap: 1,
                }}
              >
                <PlaceIcon
                  sx={{ fontSize: "1.1rem", color: brandPink, flexShrink: 0 }}
                />
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 700, color: deepText, lineHeight: 1.2 }}
                >
                  {evento.lugar || "Gran Forum, CDMX"}
                </Typography>
              </Box>
            </Stack>

            {/* 3. COSTO */}
            <Box sx={{ textAlign: "center", mb: 2.5, mt: "auto" }}>
              <Typography
                variant='caption'
                sx={{
                  display: "block",
                  color: `${deepText}80`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  mb: 0.2,
                }}
              >
                Desde
              </Typography>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 900,
                  color: deepText,
                  fontSize: { xs: "1.75rem", md: "2.1rem" },
                  lineHeight: 1,
                }}
              >
                {formatMexicanCurrency(Number(evento.costo))}
              </Typography>
            </Box>

            {/* 4. BOTONES / CTAS */}
            <Stack spacing={1.5}>
              <Button
                variant='contained'
                disabled={isAgotado}
                fullWidth
                onClick={() => handleClickOpenPurchase(evento)}
                startIcon={<ConfirmationNumberIcon />}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: "12px",
                  py: 1.2,
                  px: 2,
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  boxShadow: `0 6px 16px ${brandPink}35`,
                  transition:
                    "background-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    bgcolor: "#D65D83",
                    boxShadow: `0 8px 20px ${brandPink}50`,
                  },
                }}
              >
                {isAgotado ? "Boletos Agotados" : "Comprar boleto"}
              </Button>

              <Button
                component={Link}
                fullWidth
                to={`/evento/${evento.slug}`}
                variant='outlined'
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderColor: "rgba(61, 43, 47, 0.18)",
                  color: deepText,
                  borderRadius: "12px",
                  py: 1.2,
                  px: 2,
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: brandPink,
                    color: brandPink,
                    bgcolor: `${brandPink}08`,
                  },
                }}
              >
                Ver Detalles
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* MODAL DE COMPRA */}
      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
    </Paper>
  );
}
