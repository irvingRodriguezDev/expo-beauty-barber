import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Container,
  Fade,
} from "@mui/material";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Logo from "../../assets/images/LogoBlanco.png";
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
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(
          `https://3jjwno3km4.execute-api.us-east-2.amazonaws.com/Prod/ticket/${code}`,
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
        height='80vh'
      >
        <CircularProgress sx={{ color: COLORS.petrolBlue }} />
      </Box>
    );

  const getAccessLabel = (type) => {
    const labels = {
      SINGLE_DAY: "ACCESO UN DÍA",
      TWO_DAY: "ACCESO DOS DÍAS",
      GROUP_SINGLE: "PASE GRUPAL - 1 DÍA",
      GROUP_TWO: "PASE GRUPAL - 2 DÍAS",
    };
    return labels[type] || type;
  };

  return (
    <>
      <Navbar />

      <Fade in={true} timeout={1200}>
        <Container
          maxWidth='xs'
          sx={{ mt: 12, mb: 6, display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={24}
            sx={{
              width: "100%",
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              background: `linear-gradient(165deg, ${COLORS.petrolDark} 0%, ${COLORS.petrolBlue} 100%)`,
              border: `1px solid ${COLORS.borderWhite}`,
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
          >
            {/* Efecto de Luz de Fondo */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: `radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              {/* Header */}
              <Box sx={{ py: 5, px: 3, textAlign: "center" }}>
                <Typography
                  variant='overline'
                  sx={{
                    color: COLORS.white,
                    letterSpacing: 5,
                    fontWeight: 300,
                    opacity: 0.8,
                  }}
                >
                  PASE OFICIAL DE ENTRADA
                </Typography>

                <img
                  src={Logo}
                  width='auto'
                  height={300}
                  style={{ marginTop: -100, marginLeft: -40 }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    color: COLORS.textSecondary,
                    mt: -12,
                    fontWeight: 600,
                    letterSpacing: 1,
                  }}
                >
                  WTC CIUDAD DE MÉXICO
                </Typography>
              </Box>

              {/* Divisor Estilo Ticket con Troquelado */}
              <Box
                sx={{
                  position: "relative",
                  height: "1px",
                  borderTop: `2px dashed ${COLORS.borderWhite}`,
                  mx: 4,
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "transparent", // Debe coincidir con el color de fondo de tu App
                    top: -21,
                    zIndex: 2,
                  },
                  "&::before": { left: -60 },
                  "&::after": { right: -60 },
                }}
              />

              {/* Sección del QR */}
              <Box sx={{ textAlign: "center", mt: 6 }}>
                <Box
                  sx={{
                    display: "inline-block",
                    p: 2.5,
                    borderRadius: "24px",
                    backgroundColor: COLORS.white,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <QRCodeCanvas
                    value={code}
                    size={200}
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
                    letterSpacing: 4,
                    fontWeight: "bold",
                  }}
                >
                  {code}
                </Typography>
              </Box>

              {/* Información del Pase */}
              <Box sx={{ px: 4, mt: 4, mb: 5 }}>
                <Box
                  sx={{
                    p: 3,
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
                      }}
                    >
                      TIPO DE ACCESO
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{ color: COLORS.white, fontWeight: 700 }}
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
                      }}
                    >
                      TITULAR DE LA COMPRA
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{ color: COLORS.white, fontWeight: 500 }}
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
                  }}
                >
                  Presenta este código QR en los módulos de registro para
                  canjearlo por tu pulsera oficial de acceso.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Fade>
      <Footer />
    </>
  );
};

export default TicketView;
