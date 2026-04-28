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
import { QRCodeSVG } from "qrcode.react"; // Librería ligera para QRs

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "#FFD9E2", // Tu Dark Petroleum
  border: "1px solid #EE6F97",
  borderRadius: 2,
  boxShadow: "0 0 50px rgba(114, 248, 255, 0.1)",
  p: 4,
  textAlign: "center",
};

export const TicketModal = ({ open, handleClose, ticket }) => {
  if (!ticket) return null;

  const brandCyan = "#FA2DAF";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#EE6F97",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant='h6'
          sx={{ color: brandCyan, fontWeight: 900, mb: 1 }}
        >
          BOLETO DIGITAL
        </Typography>
        <Typography
          variant='caption'
          sx={{ color: "#EE6F97", mb: 3, display: "block" }}
        >
          MUESTRA ESTE CÓDIGO EN LA ENTRADA
        </Typography>

        <Box
          sx={{
            bgcolor: "#FFF",
            p: 2,
            borderRadius: 1,
            display: "inline-block",
            mb: 3,
          }}
        >
          <QRCodeSVG
            value={ticket.code}
            size={250}
            level={"H"}
            includeMargin={true}
          />
        </Box>

        <Stack spacing={1} sx={{ textAlign: "left", mt: 2 }}>
          <Box>
            <Typography sx={{ color: "#FA2DAF", fontSize: "0.7rem" }}>
              ASISTENTE
            </Typography>
            <Typography sx={{ color: "#FA2DAF", fontWeight: 700 }}>
              {ticket.buyerName}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <Box>
            <Typography sx={{ color: "#FA2DAF", fontSize: "0.7rem" }}>
              CÓDIGO DE ACCESO
            </Typography>
            <Typography
              sx={{
                color: brandCyan,
                fontWeight: 800,
                fontFamily: "monospace",
              }}
            >
              {ticket.code}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
