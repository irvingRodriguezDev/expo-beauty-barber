import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const SuccessTicket = ({ registration, onReset }) => {
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

  return (
    <motion.div
      key='success'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Box sx={{ maxWidth: 450, mx: "auto", position: "relative" }}>
        {/* Parte Superior del Ticket */}
        <Box
          sx={{
            background: "#042F35",
            color: "#FFF",
            p: 4,
            textAlign: "center",
            border: `1px solid rgba(114, 248, 255, 0.3)`,
            borderBottom: `2px dashed ${brandCyan}`,
            borderRadius: "0px",
            position: "relative",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              width: 20,
              height: 20,
              bgcolor: "#064E57", // Mismo color que el fondo de la sección Register para el "perforado"
              borderRadius: "50%",
              zIndex: 2,
            },
            "&::before": { left: -10 },
            "&::after": { right: -10 },
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ color: brandCyan, fontSize: 60, mb: 1 }}
          />
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.8rem",
              letterSpacing: "0.1em",
              lineHeight: 1,
            }}
          >
            ACCESO OFICIAL
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 800,
              opacity: 0.8,
              letterSpacing: "0.4em",
              color: brandCyan,
              mt: 1,
            }}
          >
            EDICIÓN 2027
          </Typography>
        </Box>

        {/* Cuerpo del Ticket */}
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            p: 5,
            textAlign: "center",
            border: `1px solid rgba(114, 248, 255, 0.3)`,
            borderTop: "none",
            boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(114, 248, 255, 0.05)`,
          }}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontWeight: 900,
              mb: 4,
              letterSpacing: "0.3em",
              fontSize: "1rem",
              textTransform: "uppercase",
              border: `1px solid ${brandCyan}`,
              display: "inline-block",
              px: 3,
              py: 1,
            }}
          >
            {registration.passTitle}
          </Typography>

          <Box
            sx={{
              bgcolor: "#FFF",
              p: 3,
              display: "inline-block",
              mb: 4,
              boxShadow: `0 0 30px ${brandCyan}44`,
            }}
          >
            <QRCodeSVG
              value={`BWM-2027-${registration.code}`}
              size={180}
              fgColor={darkPetroleum}
              level='H'
            />
          </Box>

          <Typography
            sx={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: brandCyan,
              mb: 0.5,
              letterSpacing: "0.15em",
              lineHeight: 1,
            }}
          >
            {registration.code}
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.7)",
              mb: 5,
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            {registration.nombre}
          </Typography>

          <Stack spacing={2}>
            <Button
              variant='contained'
              onClick={() => window.print()}
              sx={{
                bgcolor: brandCyan,
                color: darkPetroleum,
                borderRadius: 0,
                fontWeight: 900,
                py: 2,
                letterSpacing: "0.2em",
                "&:hover": { bgcolor: "#FFF", transform: "translateY(-3px)" },
                transition: "0.3s",
              }}
            >
              DESCARGAR PASE DIGITAL
            </Button>

            <Button
              onClick={onReset}
              sx={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                "&:hover": { color: brandCyan, bgcolor: "transparent" },
              }}
            >
              NUEVO REGISTRO
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};
