import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Chip,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { QRCodeSVG } from "qrcode.react";

export const TicketModal = ({ open, handleClose, ticket }) => {
  if (!ticket) return null;

  // Paleta Unificada de Marca
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const borderTone = "rgba(225, 29, 116, 0.15)";

  const buyerName =
    ticket.buyerName || ticket.orden?.buyerName || "Asistente Confirmado";
  const eventName =
    ticket.evento?.titulo || ticket.evento?.nombre || "Eventos Wapizima";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(43, 30, 34, 0.4)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 420 },
            bgcolor: "#FFFFFF",
            borderRadius: "28px",
            border: `1px solid ${borderTone}`,
            boxShadow: "0 25px 50px -12px rgba(225, 29, 116, 0.25)",
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            outline: "none",
          }}
        >
          {/* Botón de Cierre */}
          <IconButton
            onClick={handleClose}
            size='small'
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: darkText,
              bgcolor: "#FFF5F8",
              border: `1px solid ${borderTone}`,
              borderRadius: "12px",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: brandPink,
                color: "#FFFFFF",
                borderColor: brandPink,
              },
            }}
          >
            <CloseIcon fontSize='small' />
          </IconButton>

          {/* Badge y Encabezado */}
          <Chip
            icon={
              <QrCode2Icon
                sx={{ color: `${brandPink} !important`, fontSize: 16 }}
              />
            }
            label='PASE DE ACCESO OFICIAL'
            size='small'
            sx={{
              bgcolor: "#FFF5F8",
              color: darkText,
              fontWeight: 800,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              borderRadius: "50px",
              border: `1px solid ${borderTone}`,
              mb: 2,
              px: 0.5,
              py: 1.6,
            }}
          />

          <Typography
            variant='h5'
            sx={{
              color: darkText,
              fontWeight: 900,
              fontSize: "1.4rem",
              lineHeight: 1.2,
              mb: 0.5,
              textTransform: "uppercase",
            }}
          >
            {eventName}
          </Typography>

          <Typography
            variant='caption'
            sx={{
              color: "rgba(43, 30, 34, 0.6)",
              fontWeight: 600,
              mb: 3,
              display: "block",
            }}
          >
            Muestra este código QR en el acceso al evento
          </Typography>

          {/* Código QR */}
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2.5,
              borderRadius: "20px",
              display: "inline-block",
              border: `1px solid ${borderTone}`,
              boxShadow: "0 8px 25px rgba(225, 29, 116, 0.08)",
              mb: 3,
            }}
          >
            <QRCodeSVG
              value={ticket.code || "N/A"}
              size={210}
              level={"H"}
              includeMargin={false}
            />
          </Box>

          {/* Detalles del Boleto */}
          <Stack
            spacing={1.8}
            sx={{
              bgcolor: "#FFF5F8",
              p: 2.5,
              borderRadius: "18px",
              border: `1px solid ${borderTone}`,
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "rgba(43, 30, 34, 0.5)",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  TITULAR
                </Typography>
                <Typography
                  sx={{
                    color: darkText,
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                  }}
                >
                  {buyerName}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: borderTone }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(43, 30, 34, 0.5)",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                }}
              >
                CÓDIGO DE VALIDACIÓN
              </Typography>
              <Typography
                sx={{
                  color: brandPink,
                  fontWeight: 900,
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                  bgcolor: "#FFFFFF",
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "8px",
                  border: `1px solid ${borderTone}`,
                }}
              >
                {ticket.code || "000000"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
