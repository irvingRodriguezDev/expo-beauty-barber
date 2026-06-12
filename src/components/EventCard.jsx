import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import PurchaseModal from "./PurchaseModal";

export default function EventCard({
  evento,
  onViewDetails,
  onOpenPurchase,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  // Aseguramos un precio base formateado o un texto de preventa
  const precioFormateado = evento.costo
    ? `${formatMexicanCurrency(Number(evento.costo))} MXN`
    : "Preventa Activa";
  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleClickOpenPurchase = (id) => {
    setOpenPurchase(true);
    setSelectedEvent(id);
  };
  const handleClosePurchase = () => {
    setOpenPurchase(false);
    setSelectedEvent(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ y: -4 }}
      style={{ paddingBottom: "20px" }}
    >
      <Card
        sx={{
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(238, 111, 151, 0.2)",
          boxShadow: "0 20px 40px rgba(61, 43, 47, 0.06)",
          overflow: "hidden",
        }}
      >
        <Box
          display='flex'
          flexDirection={{ xs: "column", md: "row" }}
          alignItems='stretch'
        >
          {/* Contenedor Visual: Flyer del Evento */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              minHeight: { xs: "200px", md: "300px" },
              position: "relative",
              overflow: "hidden",
              bgcolor: "rgba(61, 43, 47, 0.03)",
            }}
          >
            {evento.flyer ? (
              <Box
                component='img'
                src={evento.flyer}
                alt={evento.titulo}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.04)",
                  },
                }}
              />
            ) : (
              // Fallback estético si no hay imagen arriba todavía
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                height='100%'
                width='100%'
                sx={{
                  background: `linear-gradient(45deg, ${brandPink}15, rgba(255,255,255,1))`,
                }}
              >
                <LocalActivityIcon
                  sx={{ fontSize: "3rem", color: `${brandPink}40` }}
                />
              </Box>
            )}

            {/* Badge de Costo Premium sobrepuesto en la imagen */}
            <Chip
              label={precioFormateado}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(5px)",
                color: deepText,
                fontWeight: 900,
                fontSize: "0.85rem",
                border: `1px solid ${brandPink}30`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
          </Box>

          {/* Contenedor de Información Transaccional */}
          <CardContent
            sx={{
              p: { xs: 3, sm: 4 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:last-child": { pb: { xs: 3, sm: 4 } },
            }}
          >
            <Box>
              {/* Tag sutil de disponibilidad */}
              <Typography
                variant='caption'
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: brandPink,
                  display: "block",
                  mb: 1,
                }}
              >
                {/* Preventa Autorizada Abierta ⚡ */}
              </Typography>

              <Typography
                variant='h5'
                sx={{
                  fontWeight: 900,
                  color: deepText,
                  mb: 2,
                  lineHeight: 1.2,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  textTransform: "uppercase",
                }}
              >
                {evento.titulo}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 3 }}
                sx={{ mb: 4, color: "rgba(61, 43, 47, 0.75)" }}
              >
                <Box display='flex' alignItems='center' gap={1}>
                  <CalendarMonthIcon
                    sx={{ fontSize: "1.2rem", color: brandPink }}
                  />
                  <Typography variant='body2' sx={{ fontWeight: 700 }}>
                    {FormatDate(evento.fecha)}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 3 }}
                sx={{ mb: 4, color: "rgba(61, 43, 47, 0.75)" }}
              >
                <Box display='flex' alignItems='center' gap={1}>
                  <LocationOnIcon
                    sx={{ fontSize: "1.2rem", color: brandPink }}
                  />
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    {evento.lugar}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Acciones de Compra Directa */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              width='100%'
            >
              {/* Ajustamos el Link para que se estire correctamente junto con el botón usando flex: 1 */}
              <Link
                to={`/evento/${evento.slug}`}
                style={{ textDecoration: "none", flex: 1, display: "flex" }}
              >
                <Button
                  variant='outlined'
                  startIcon={<ArticleIcon />}
                  fullWidth // <-- Forzamos a que ocupe todo el ancho disponible que le da el Link
                  sx={{
                    borderColor: "rgba(61, 43, 47, 0.25)",
                    color: deepText,
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    py: 1.5,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: deepText,
                      bgcolor: "rgba(61,43,47,0.03)",
                    },
                  }}
                >
                  Detalles
                </Button>
              </Link>

              <Button
                variant='contained'
                // 💡 SOLUCIÓN AL RE-RENDER: Añadimos () => antes de tu función
                // Ahora solo se va a ejecutar cuando el usuario le dé un tap/clic real
                onClick={() => handleClickOpenPurchase(evento)}
                startIcon={<ConfirmationNumberIcon />}
                sx={{
                  bgcolor: brandPink,
                  color: "#FFF",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  px: 4,
                  py: 1.5,
                  flex: 1.4,
                  textTransform: "none",
                  boxShadow: `0 8px 24px rgba(238, 111, 151, 0.35)`,
                  "&:hover": {
                    bgcolor: brandPink,
                    color: "#FFF",
                    boxShadow: "0 8px 24px rgba(61, 43, 47, 0.25)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Comprar Boleto
              </Button>
            </Stack>
          </CardContent>
        </Box>
      </Card>
      {selectedEvent && (
        <PurchaseModal
          open={openPurchase}
          onClose={handleClosePurchase}
          evento={selectedEvent}
        />
      )}
    </motion.div>
  );
}
