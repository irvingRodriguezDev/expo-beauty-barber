import React from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

// --- CONFIGURACIÓN DE MARCA ---
const brandPink = "#E53888";
const deepText = "#3D2B2F";
const softBg = "#FFD9E2";

const SCHEDULE = [
  { time: "07:00", act: "ACCESO", boss: "Staff Wapizima", type: "logistics" },
  { time: "09:30", act: "BIENVENIDA", boss: "Dinámicas", type: "logistics" },
  { time: "10:00", act: "MANICURA", boss: "Carolina Tavera", type: "master" },
  { time: "11:30", act: "ESTRUCTURA", boss: "Yazmin Ibarra", type: "master" },
  {
    time: "13:30",
    act: "BREAK",
    boss: "Música & Networking",
    type: "logistics",
  },
  {
    time: "14:30",
    act: "MICROPINTURA",
    boss: "Barbie con Pincel",
    type: "master",
  },
  { time: "17:00", act: "RELIEVES", boss: "Poison Studio", type: "master" },
  { time: "19:00", act: "CIERRE", boss: "Premiación", type: "event" },
];

const MotionPaper = motion(Paper);

export const EventTimeline = () => {
  return (
    <Box component='section' sx={{ py: 6, bgcolor: softBg, height: "100%" }}>
      <Container maxWidth='2xl'>
        {/* Cabecera compacta */}
        <Box
          sx={{
            mb: 4,
            px: 2,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant='overline'
            sx={{
              fontWeight: 900,
              color: brandPink,
              letterSpacing: 3,
              display: "block",
              mb: 1,
            }}
          >
            Cronograma Oficial
          </Typography>
          <Typography
            variant='h4'
            sx={{
              fontWeight: 900,
              color: deepText,
              fontFamily: "'Syne', sans-serif",
            }}
          >
            06 Junio <span style={{ color: brandPink }}>• WTC CDMX</span>
          </Typography>
        </Box>

        {/* Contenedor Adaptable */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflowX: { md: "auto" },
            gap: 2,
            pb: 3,
            px: 2,
            // Scrollbar minimalista para desktop
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255, 255, 255, 0)",
              borderRadius: "10px",
            },
            scrollbarWidth: "thin",
            scrollbarColor: `${brandPink} transparent`,
            height: { md: "auto" },
          }}
        >
          {SCHEDULE.map((item, index) => (
            <MotionPaper
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              elevation={0}
              sx={{
                flexShrink: 0,
                width: { xs: "100%", md: "210px" },
                p: 2.5,
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${item.type === "master" ? "rgba(229, 56, 136, 0.3)" : "rgba(229, 56, 136, 0.08)"}`,
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                textAlign: { md: "center" },
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Indicador Masterclass */}
              {item.type === "master" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: `linear-gradient(90deg, ${brandPink}, #FFD700)`,
                  }}
                />
              )}

              {/* Hora */}
              <Typography
                sx={{
                  fontWeight: 900,
                  color: brandPink,
                  fontSize: "0.75rem",
                  bgcolor: "rgba(229, 56, 136, 0.08)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  mr: { xs: 2, md: 0 },
                  mb: { md: 2 },
                }}
              >
                {item.time}
              </Typography>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    fontWeight: 800,
                    color: deepText,
                    lineHeight: 1.2,
                    mb: 0.5,
                  }}
                >
                  {item.act}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    color: "rgba(61, 43, 47, 0.6)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "0.65rem",
                  }}
                >
                  {item.boss}
                </Typography>
              </Box>

              {/* Mini Avatar para Masterclasses */}
              {/* {item.type === "master" && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    ml: { xs: 1, md: 0 },
                    mt: { md: 1.5 },
                    border: `1px solid ${brandPink}`,
                    p: 0.2,
                    bgcolor: "#fff",
                  }}
                />
              )} */}
            </MotionPaper>
          ))}
        </Box>

        {/* Aviso de Venta (Compacto) */}
        <Box sx={{ mt: 4, px: 2, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant='caption'
            sx={{
              color: "rgba(61, 43, 47, 0.4)",
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            * VENTA DE PRODUCTOS DISPONIBLE DURANTE TODO EL EVENTO
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
