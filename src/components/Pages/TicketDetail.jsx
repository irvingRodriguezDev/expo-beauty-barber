import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Fade,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Logo from "../../assets/images/LogoBlanco.webp";

const COLORS = {
  petrolBlue: "#004d4d",
  petrolDark: "#001a1a",
  white: "#ffffff",
  textSecondary: "#a0d1d1",
  glass: "rgba(255, 255, 255, 0.05)",
  borderWhite: "rgba(255, 255, 255, 0.15)",
};

const TicketView = () => {
  const { code } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://api.expobellezaybarberias.com/ticket/${code}`,
        );
        if (!response.ok) throw new Error("Ticket no encontrado");
        const data = await response.json();
        setTicketData(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [code]);

  if (loading)
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress sx={{ color: COLORS.petrolBlue }} />
      </Box>
    );

  const getAccessLabel = (type) => {
    const labels = {
      SINGLE_DAY: "ACCESO UN DÍA",
      TWO_DAYS: "ACCESO DOS DÍAS",
      GROUP_SINGLE: "PASE GRUPAL - 1 DÍA",
      GROUP_TWO: "PASE GRUPAL - 2 DÍAS",
    };
    return labels[type] || type;
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* <Navbar /> */}

      <Fade in={true} timeout={1200}>
        <Container
          maxWidth='sm' // Reducimos a SM para que no se vea tan estirado en desktop
          sx={{
            mt: { xs: 10, md: 15 },
            mb: 8,
            display: "flex",
            justifyContent: "center",
            px: { xs: 2, sm: 3 }, // Padding lateral preventivo
          }}
        >
          <Paper
            elevation={24}
            sx={{
              width: "100%",
              position: "relative",
              borderRadius: { xs: "20px", md: "28px" },
              overflow: "hidden",
              background: `linear-gradient(165deg, ${COLORS.petrolDark} 0%, ${COLORS.petrolBlue} 100%)`,
              border: `1px solid ${COLORS.borderWhite}`,
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
          >
            {/* Header */}
            <Box
              sx={{ pt: { xs: 4, md: 6 }, pb: 2, px: 3, textAlign: "center" }}
            >
              <Typography
                variant='overline'
                sx={{
                  color: COLORS.white,
                  letterSpacing: { xs: 3, md: 5 },
                  fontWeight: 300,
                  opacity: 0.8,
                  fontSize: { xs: "0.65rem", md: "0.75rem" },
                }}
              >
                PASE OFICIAL DE ENTRADA
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mt: { xs: -2, md: -4 },
                }}
              >
                <Box
                  component='img'
                  src={Logo}
                  sx={{
                    width: { xs: "200px", md: "300px" },
                    height: "auto",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  }}
                />
              </Box>

              <Typography
                variant='body2'
                sx={{
                  color: COLORS.textSecondary,
                  mt: { xs: -2, md: -4 },
                  fontWeight: 600,
                  letterSpacing: 1,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                }}
              >
                WTC CIUDAD DE MÉXICO
              </Typography>
            </Box>

            {/* Divisor Estilo Ticket con Troquelado Responsive */}
            <Box
              sx={{
                position: "relative",
                height: "1px",
                borderTop: `2px dashed ${COLORS.borderWhite}`,
                mx: { xs: 3, md: 4 },
                my: 4,
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  width: { xs: 25, md: 40 },
                  height: { xs: 25, md: 40 },
                  borderRadius: "50%",
                  background: COLORS.petrolDark, // Cambiado para fundirse con el fondo
                  top: { xs: -13, md: -21 },
                  zIndex: 2,
                },
                "&::before": { left: { xs: -42, md: -60 } },
                "&::after": { right: { xs: -42, md: -60 } },
              }}
            />

            {/* Sección del QR */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                sx={{
                  display: "inline-block",
                  p: { xs: 1.5, md: 2.5 },
                  borderRadius: "20px",
                  backgroundColor: COLORS.white,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <QRCodeCanvas
                  value={code}
                  size={isMobile ? 160 : 200}
                  level='H'
                  fgColor={COLORS.petrolDark}
                />
              </Box>
              <Typography
                variant='h6'
                sx={{
                  color: COLORS.white,
                  mt: 3,
                  fontFamily: "monospace",
                  letterSpacing: { xs: 2, md: 4 },
                  fontWeight: "bold",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {code}
              </Typography>
            </Box>

            {/* Información del Pase */}
            <Box sx={{ px: { xs: 2, md: 4 }, mt: 4, mb: 5 }}>
              <Box
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: "20px",
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.borderWhite}`,
                  backdropFilter: "blur(15px)",
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant='caption'
                    sx={{
                      color: COLORS.textSecondary,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      fontSize: "0.65rem",
                    }}
                  >
                    TIPO DE ACCESO
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: COLORS.white,
                      fontWeight: 700,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                    }}
                  >
                    {getAccessLabel(ticketData?.accessType)}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      color: COLORS.textSecondary,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      fontSize: "0.65rem",
                    }}
                  >
                    TITULAR DE LA COMPRA
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      color: COLORS.white,
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                    }}
                  >
                    {ticketData?.fullname}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Footer Informativo */}
            <Box
              sx={{
                py: 3,
                px: 4,
                textAlign: "center",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: COLORS.white,
                  opacity: 0.8,
                  lineHeight: 1.5,
                  display: "block",
                  fontSize: { xs: "0.65rem", md: "0.75rem" },
                }}
              >
                Presenta este código QR en los módulos de registro para
                canjearlo por tu pulsera oficial de acceso.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Fade>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Link to={"/"}>
          <Button sx={{ borderRadius: 2 }} variant='contained'>
            Ir a la Página Principal
          </Button>
        </Link>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default TicketView;
