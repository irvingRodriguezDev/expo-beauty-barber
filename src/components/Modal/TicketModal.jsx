import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QRCodeSVG } from "qrcode.react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "#FFF", // Fondo blanco limpio
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(138, 79, 95, 0.15)",
  p: 4,
  textAlign: "center",
  border: "1px solid rgba(238, 111, 151, 0.1)",
  outline: "none",
};

export const TicketModal = ({ open, handleClose, ticket }) => {
  if (!ticket) return null;

  const brandPink = "#ee6f97";
  const textDeepPink = "#8A4F5F";
  const softPinkBg = "#FFF5F7";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 217, 226, 0.4)",
      }}
    >
      <Box sx={style}>
        {/* Botón Cerrar Estilizado */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: brandPink,
            bgcolor: softPinkBg,
            "&:hover": { bgcolor: "#FFD9E2" },
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>

        {/* Cabecera del Ticket */}
        <Typography
          variant='overline'
          sx={{
            color: brandPink,
            fontWeight: 900,
            letterSpacing: "0.3em",
            display: "block",
            mb: 0.5,
          }}
        >
          Acceso Oficial
        </Typography>
        <Typography
          variant='h6'
          sx={{
            color: textDeepPink,
            fontWeight: 900,
            textTransform: "uppercase",
            fontSize: "1.1rem",
            mb: 3,
          }}
        >
          Beauty World Mexico
        </Typography>

        {/* Contenedor del QR con estética de tarjeta */}
        <Box
          sx={{
            bgcolor: softPinkBg,
            p: 3,
            borderRadius: "20px",
            display: "inline-block",
            border: `2px dashed ${brandPink}44`,
            mb: 3,
            position: "relative",
          }}
        >
          <QRCodeSVG
            value={ticket.ticketCode}
            size={200}
            level={"H"}
            includeMargin={false}
            fgColor={textDeepPink} // QR en tono rosa oscuro para coherencia
            bgColor='transparent'
          />
        </Box>

        {/* Información del Asistente */}
        <Stack spacing={2.5} sx={{ textAlign: "center", mt: 1 }}>
          <Box>
            <Typography
              sx={{
                color: brandPink,
                fontSize: "0.65rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Nombre del Asistente
            </Typography>
            <Typography
              sx={{
                color: textDeepPink,
                fontWeight: 800,
                fontSize: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              {ticket.fullname}
            </Typography>
          </Box>

          <Divider
            sx={{
              borderColor: "rgba(238, 111, 151, 0.1)",
              borderStyle: "dashed",
            }}
          />

          <Box>
            <Typography
              sx={{
                color: brandPink,
                fontSize: "0.65rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Código Único de Acceso
            </Typography>
            <Typography
              sx={{
                color: textDeepPink,
                fontWeight: 900,
                fontFamily: "monospace",
                fontSize: "1.3rem",
                letterSpacing: "2px",
                bgcolor: softPinkBg,
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: "8px",
              }}
            >
              {ticket.ticketCode}
            </Typography>
          </Box>
        </Stack>

        {/* Pie del Modal */}
        <Typography
          variant='caption'
          sx={{
            color: textDeepPink,
            opacity: 0.5,
            mt: 4,
            display: "block",
            fontWeight: 600,
          }}
        >
          Presenta este código digital o impreso <br /> en los mostradores del
          WTC.
        </Typography>
      </Box>
    </Modal>
  );
};
