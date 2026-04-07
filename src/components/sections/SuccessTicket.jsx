import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const SuccessTicket = ({ registration, onReset }) => (
  <motion.div
    key='success'
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <Box sx={{ maxWidth: 450, mx: "auto" }}>
      <Box
        sx={{
          background: "#041C16",
          color: "#FFF",
          p: 4,
          textAlign: "center",
          border: "1px solid #D4AF37",
          borderBottom: "2px dashed rgba(212, 175, 55, 0.3)",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ color: "#D4AF37", fontSize: 50, mb: 1 }}
        />
        <Typography
          sx={{
            fontFamily: "'Syne'",
            fontWeight: 900,
            fontSize: "1.5rem",
            letterSpacing: "0.1em",
          }}
        >
          ACCESO OFICIAL
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7rem",
            opacity: 0.6,
            letterSpacing: "0.3em",
            color: "#D4AF37",
          }}
        >
          EBB MÉXICO 2027
        </Typography>
      </Box>

      <Box
        sx={{
          background: "#FFF",
          p: 4,
          textAlign: "center",
          border: "1px solid #D4AF37",
          borderTop: "none",
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
        }}
      >
        <Typography
          sx={{
            color: "#062C22",
            fontWeight: 800,
            mb: 3,
            letterSpacing: "0.2em",
          }}
        >
          {registration.passTitle}
        </Typography>
        <Box
          sx={{
            border: "1px solid #D4AF37",
            p: 2,
            display: "inline-block",
            mb: 3,
          }}
        >
          <QRCodeSVG
            value={`EBB-2027-${registration.code}`}
            size={160}
            fgColor='#062C22'
          />
        </Box>
        <Typography
          sx={{
            fontFamily: "'Syne'",
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "#062C22",
            mb: 0.5,
            letterSpacing: "0.1em",
          }}
        >
          {registration.code}
        </Typography>
        <Typography
          sx={{ fontSize: "0.8rem", color: "#668678", mb: 4, fontWeight: 700 }}
        >
          {registration.nombre.toUpperCase()}
        </Typography>

        <Button
          fullWidth
          variant='outlined'
          onClick={() => window.print()}
          sx={{
            borderColor: "#062C22",
            color: "#062C22",
            borderRadius: 0,
            fontWeight: 800,
            letterSpacing: "0.2em",
            "&:hover": { borderColor: "#D4AF37", color: "#D4AF37" },
          }}
        >
          DESCARGAR PASE
        </Button>
        <Button
          fullWidth
          onClick={onReset}
          sx={{
            mt: 2,
            color: "#D4AF37",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
          }}
        >
          NUEVO REGISTRO
        </Button>
      </Box>
    </Box>
  </motion.div>
);
