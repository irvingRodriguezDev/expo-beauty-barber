import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { QRCodeSVG } from "qrcode.react";

const brandPink = "#E53888";
const champagneGold = "#C5A059";
const deepText = "#2B1E22";
const mutedText = "#6E5D62";
const softPinkBg = "#FFF5F8";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 410 },
  bgcolor: "#FFFFFF",
  backgroundImage:
    "radial-gradient(circle at 50% 0%, rgba(229, 56, 136, 0.08) 0%, #FFFFFF 55%)",
  border: "1px solid rgba(197, 160, 89, 0.4)",
  borderRadius: "24px",
  boxShadow: "0 24px 60px rgba(43, 30, 34, 0.16)",
  p: { xs: 3, sm: 4 },
  textAlign: "center",
  outline: "none",
  fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
};

export const TicketModal = ({ open, handleClose, ticket }) => {
  if (!ticket) return null;

  const attendeeName =
    ticket.orden?.buyerName || ticket.buyerName || "Invitado Wapizima";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          size='small'
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: mutedText,
            bgcolor: softPinkBg,
            "&:hover": {
              color: brandPink,
              bgcolor: "rgba(229, 56, 136, 0.12)",
            },
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>

        <Chip
          label='✦ WAPIZIMA • PASE DIGITAL ✦'
          size='small'
          sx={{
            bgcolor: softPinkBg,
            color: brandPink,
            border: "1px solid rgba(229, 56, 136, 0.22)",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "1.8px",
            mb: 1.5,
          }}
        />

        <Typography
          variant='h6'
          sx={{
            color: deepText,
            fontWeight: 900,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
          }}
        >
          BOLETO DIGITAL
        </Typography>

        <Typography
          variant='caption'
          sx={{
            color: mutedText,
            mb: 2.5,
            display: "block",
            fontWeight: 600,
            letterSpacing: "0.8px",
          }}
        >
          MUESTRA ESTE CÓDIGO QR EN LA ENTRADA
        </Typography>

        {/* Contenedor del QR */}
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 2,
            borderRadius: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            border: `1.5px solid ${champagneGold}`,
            boxShadow: "0 12px 28px rgba(229, 56, 136, 0.1)",
          }}
        >
          <QRCodeSVG
            value={ticket.code}
            size={210}
            level='H'
            includeMargin={false}
            fgColor={deepText}
            bgColor='#FFFFFF'
          />
        </Box>

        {/* Detalles del Boleto */}
        <Box
          sx={{
            bgcolor: softPinkBg,
            borderRadius: "16px",
            p: 2,
            border: "1px solid rgba(197, 160, 89, 0.25)",
          }}
        >
          <Stack spacing={1.5} sx={{ textAlign: "left" }}>
            <Box>
              <Typography
                sx={{
                  color: champagneGold,
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Asistente
              </Typography>
              <Typography
                sx={{
                  color: deepText,
                  fontWeight: 800,
                  fontSize: "0.98rem",
                  mt: 0.2,
                }}
              >
                {attendeeName}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "rgba(197, 160, 89, 0.3)" }} />

            <Box>
              <Typography
                sx={{
                  color: champagneGold,
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Código de Acceso
              </Typography>
              <Typography
                sx={{
                  color: brandPink,
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.5px",
                  mt: 0.2,
                }}
              >
                {ticket.code}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};
