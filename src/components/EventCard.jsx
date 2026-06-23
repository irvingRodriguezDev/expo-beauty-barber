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
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FormatDate from "../utils/FormatDate";
import { formatMexicanCurrency } from "../utils/FormatCurrency";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import PurchaseModal from "./PurchaseModal";

export default function EventCard({
  evento,
  brandPink = "#EE6F97",
  deepText = "#3D2B2F",
}) {
  const isAgotado = evento.is_sold_out || false;
  const [openPurchase, setOpenPurchase] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const precioFormateado = evento.costo
    ? `${formatMexicanCurrency(Number(evento.costo))} MXN`
    : "Preventa Activa";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={!isAgotado ? { y: -4 } : {}}
      style={{ height: "100%", display: "flex" }}
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: "24px",
          bgcolor: "rgba(255, 255, 255, 0.98)",
          border: `1px solid rgba(238, 111, 151, 0.15)`,
          boxShadow: "0 10px 30px rgba(61, 43, 47, 0.04)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "85vh", // Evita que crezca infinitamente en pantallas verticales
        }}
      >
        {/* 🖼️ CONTENEDOR FLEXIBLE PARA EL FLYER */}
        <Box
          sx={{
            width: "100%",
            flex: "1 1 auto",
            position: "relative",
            overflow: "hidden",
            bgcolor: "rgba(61, 43, 47, 0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                objectFit: "cover", // O "contain" si prefieres ver los bordes completos sin recortes mínimos
                objectPosition: "center top",
              }}
            />
          ) : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='250px'
              width='100%'
              sx={{
                background: `linear-gradient(45deg, ${brandPink}10, rgba(255,255,255,1))`,
              }}
            >
              <LocalActivityIcon
                sx={{ fontSize: "2.5rem", color: `${brandPink}30` }}
              />
            </Box>
          )}

          {/* Sello de Agotado */}
          {isAgotado && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(61, 43, 47, 0.4)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#FFF",
                  fontWeight: 900,
                  fontSize: "1.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "3px solid #FFF",
                  px: 3,
                  py: 0.5,
                  borderRadius: "8px",
                  transform: "rotate(-10deg)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                Agotado
              </Typography>
            </Box>
          )}

          {/* Badge del Precio flotando de forma sutil */}
          {!isAgotado && (
            <Chip
              label={precioFormateado}
              sx={{
                position: "absolute",
                top: 14,
                left: 14,
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                color: deepText,
                fontWeight: 800,
                fontSize: "0.75rem",
                border: `1px solid rgba(61, 43, 47, 0.08)`,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                zIndex: 1,
              }}
            />
          )}
        </Box>

        {/* 📝 CONTENEDOR DE DETALLES Y BOTONES (Fijado abajo para acceso inmediato) */}
        <CardContent
          sx={{
            p: 2.5,
            bgcolor: "#FFF",
            borderTop: "1px solid rgba(61, 43, 47, 0.04)",
            flex: "0 0 auto", // Impide que esta sección colapse o se estire anormalmente
          }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              color: deepText,
              mb: 1.5,
              fontSize: "1.15rem",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 1, // Reducido a 1 línea para ganar espacio vertical para los botones
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textTransform: "uppercase",
            }}
          >
            {evento.titulo}
          </Typography>

          <Stack direction='row' alignItems='center' gap={1} sx={{ mb: 2 }}>
            <CalendarMonthIcon sx={{ fontSize: "1rem", color: brandPink }} />
            <Typography
              variant='body2'
              sx={{
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "rgba(61, 43, 47, 0.7)",
              }}
            >
              {FormatDate(evento.fecha)}
            </Typography>
          </Stack>

          {/* ⚡ BOTONES DE ACCIÓN VISIBLES Y ERGONÓMICOS */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            width='100%'
          >
            <Link
              to={`/evento/${evento.slug}`}
              style={{ textDecoration: "none", flex: 1, display: "flex" }}
            >
              <Button
                variant='outlined'
                startIcon={<ArticleIcon />}
                fullWidth
                sx={{
                  borderColor: "rgba(61, 43, 47, 0.15)",
                  color: deepText,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: brandPink,
                    bgcolor: "rgba(238, 111, 151, 0.02)",
                  },
                }}
              >
                Detalles
              </Button>
            </Link>

            <Button
              variant='contained'
              disabled={isAgotado}
              onClick={() => handleClickOpenPurchase(evento)}
              startIcon={<ConfirmationNumberIcon />}
              sx={{
                background: `linear-gradient(135deg, ${brandPink} 0%, #D64C77 100%)`,
                color: "#FFF",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.8rem",
                py: 1.2,
                flex: 1.2,
                textTransform: "none",
                boxShadow: `0 6px 20px rgba(238, 111, 151, 0.25)`,
              }}
            >
              Comprar
            </Button>
          </Stack>
        </CardContent>
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
