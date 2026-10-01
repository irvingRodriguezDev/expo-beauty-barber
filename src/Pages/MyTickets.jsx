import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Stack,
  Paper,
  Divider,
  IconButton,
  Grid,
  Chip,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StarsIcon from "@mui/icons-material/Stars";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { TicketModal } from "../components/Modal/TicketModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import MethodGet from "../config/service";
import Navbar from "../components/Layout/Navbar";
const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Paleta Unificada de Marca
  const brandPink = "#E11D74";
  const darkText = "#2B1E22";
  const lightBg = "#FFF5F8";
  const borderTone = "rgba(225, 29, 116, 0.15)";

  const fetchTickets = useCallback(
    async (isSilent = false) => {
      if (!email.trim()) return;
      if (!isSilent) {
        setLoading(true);
      }
      try {
        const response = await MethodGet(
          `/ticket/search?email=${email.toLowerCase().trim()}`,
        );

        setTickets(response.data?.tickets || []);
        setSearched(true);
      } catch (err) {
        console.error("Error en fetchTickets:", err);
      } finally {
        if (!isSilent) setLoading(false);
      }
    },
    [email],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchTickets();
    }
  };

  useEffect(() => {
    let interval = null;

    if (searched && tickets.length > 0) {
      interval = setInterval(() => {
        fetchTickets(true);
      }, 40000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [searched, tickets.length, fetchTickets]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: lightBg,
          minHeight: "100vh",
          pt: { xs: 12, md: 16 },
          pb: 10,
          px: 2,
          position: "relative",
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(225, 29, 116, 0.08) 0%, transparent 60%)`,
        }}
      >
        <Container maxWidth='md'>
          <Stack spacing={6} alignItems='center'>
            {/* ENCABEZADO PRINCIPAL */}
            <Box sx={{ textAlign: "center", maxWidth: 600 }}>
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  icon={
                    <StarsIcon
                      sx={{ color: `${brandPink} !important`, fontSize: 16 }}
                    />
                  }
                  label='PORTAL DE INVITADAS'
                  size='small'
                  sx={{
                    bgcolor: "#FFFFFF",
                    color: darkText,
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    borderRadius: "50px",
                    border: `1px solid ${borderTone}`,
                    mb: 2,
                    px: 0.5,
                    py: 1.8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                />

                <Typography
                  variant='h1'
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    color: darkText,
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    mb: 2,
                  }}
                >
                  Consulta tus <br />
                  <Typography
                    component='span'
                    sx={{
                      color: brandPink,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "inherit",
                      fontFamily: "serif",
                    }}
                  >
                    boletos digitales
                  </Typography>
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(43, 30, 34, 0.7)",
                    fontSize: { xs: "0.92rem", md: "1rem" },
                    fontWeight: 450,
                  }}
                >
                  Ingresa el correo electrónico asociado a tu compra para
                  obtener tus accesos y códigos QR.
                </Typography>
              </motion.div>
            </Box>

            {/* BUSCADOR ESTILO LOUNGE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ width: "100%", maxWidth: 540 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 0.8,
                  pl: 2,
                  borderRadius: "50px",
                  bgcolor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${borderTone}`,
                  boxShadow: "0 12px 35px -10px rgba(225, 29, 116, 0.12)",
                  transition: "all 0.3s ease",
                  "&:focus-within": {
                    borderColor: brandPink,
                    boxShadow: "0 16px 40px -10px rgba(225, 29, 116, 0.2)",
                  },
                }}
              >
                <MailOutlineIcon
                  sx={{ color: brandPink, mr: 1.5, fontSize: 22 }}
                />
                <TextField
                  fullWidth
                  placeholder='ejemplo@correo.com'
                  variant='standard'
                  value={email}
                  autoComplete='off'
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontWeight: 600,
                      color: darkText,
                      fontSize: "0.95rem",
                    },
                  }}
                />
                <Button
                  onClick={() => fetchTickets()}
                  disabled={loading || !email.trim()}
                  variant='contained'
                  sx={{
                    bgcolor: brandPink,
                    color: "#FFF",
                    borderRadius: "50px",
                    px: 3,
                    py: 1.4,
                    minWidth: "auto",
                    fontWeight: 800,
                    boxShadow: "0 4px 15px rgba(225, 29, 116, 0.3)",
                    "&:hover": {
                      bgcolor: "#c91361",
                      transform: "scale(1.02)",
                    },
                    "&:disabled": {
                      bgcolor: "rgba(225, 29, 116, 0.3)",
                      color: "#FFF",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : (
                    <ArrowForwardIcon />
                  )}
                </Button>
              </Paper>
            </motion.div>

            {/* LISTA DE TICKETS (PASES VIP) */}
            <Grid container spacing={3} sx={{ mt: 1, width: "100%" }}>
              <AnimatePresence>
                {tickets.map((ticket, index) => (
                  <Grid item xs={12} sm={6} key={ticket.code || index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -4 }}
                    >
                      <Box
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setModalOpen(true);
                        }}
                        sx={{
                          display: "flex",
                          bgcolor: "#FFFFFF",
                          borderRadius: "20px",
                          overflow: "hidden",
                          height: 130,
                          cursor: "pointer",
                          position: "relative",
                          border: `1px solid ${borderTone}`,
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: brandPink,
                            boxShadow: "0 14px 35px rgba(225, 29, 116, 0.15)",
                          },
                        }}
                      >
                        {/* BANDA LATERAL IZQUIERDA CON ID */}
                        <Box
                          sx={{
                            width: 38,
                            bgcolor: darkText,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: brandPink,
                              transform: "rotate(-90deg)",
                              whiteSpace: "nowrap",
                              fontSize: "0.58rem",
                              fontWeight: 900,
                              letterSpacing: "0.22em",
                            }}
                          >
                            PASS #{ticket.code ? ticket.code.slice(-4) : "0000"}
                          </Typography>
                        </Box>

                        {/* CUERPO DEL TICKET */}
                        <Box
                          sx={{
                            flexGrow: 1,
                            p: 2.5,
                            pr: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 900,
                              color: darkText,
                              fontSize: "1rem",
                              textTransform: "uppercase",
                              lineHeight: 1.2,
                              mb: 0.5,
                            }}
                          >
                            {ticket.buyerName || "Asistente Confirmado"}
                          </Typography>
                          <Typography
                            sx={{
                              color: brandPink,
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {ticket.evento?.titulo ||
                              ticket.evento?.nombre ||
                              "Eventos Wapizima"}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgba(43, 30, 34, 0.5)",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              mt: 0.5,
                            }}
                          >
                            Clic para ver pase de acceso
                          </Typography>
                        </Box>

                        {/* PERFORACIONES VISUALES */}
                        <Box
                          sx={{
                            position: "absolute",
                            right: 70,
                            top: -9,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            bgcolor: lightBg,
                            border: `1px solid ${borderTone}`,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: 70,
                            bottom: -9,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            bgcolor: lightBg,
                            border: `1px solid ${borderTone}`,
                          }}
                        />

                        <Divider
                          orientation='vertical'
                          flexItem
                          sx={{
                            borderStyle: "dashed",
                            borderColor: "rgba(225, 29, 116, 0.2)",
                            my: 1.5,
                            mr: 9,
                          }}
                        />

                        {/* ICONO Y ACCIÓN LATERAL */}
                        <Box
                          sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 70,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(225, 29, 116, 0.03)",
                          }}
                        >
                          <QrCode2Icon
                            sx={{ color: brandPink, fontSize: 28 }}
                          />
                          <Typography
                            sx={{
                              fontSize: "0.55rem",
                              fontWeight: 800,
                              color: brandPink,
                              mt: 0.5,
                            }}
                          >
                            VER QR
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {/* MENSAJES DE ESTADO */}
            {searched && tickets.length === 0 && !loading && (
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "#FFFFFF",
                  p: 4,
                  borderRadius: "24px",
                  border: `1px solid ${borderTone}`,
                  maxWidth: 450,
                  width: "100%",
                }}
              >
                <ConfirmationNumberIcon
                  sx={{ fontSize: 40, color: "rgba(225, 29, 116, 0.3)", mb: 1 }}
                />
                <Typography
                  sx={{
                    color: darkText,
                    fontWeight: 800,
                    fontSize: "1rem",
                    mb: 0.5,
                  }}
                >
                  Sin registros de compra
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(43, 30, 34, 0.6)",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                  }}
                >
                  No encontramos boletos asociados a este correo. Verifica que
                  esté bien escrito o consulta con soporte.
                </Typography>
              </Box>
            )}

            {tickets.length > 0 && (
              <Typography
                variant='caption'
                sx={{
                  color: "rgba(43, 30, 34, 0.5)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  component='span'
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: brandPink,
                    display: "inline-block",
                  }}
                />
                La lista se actualiza automáticamente cada 40 segundos
              </Typography>
            )}
          </Stack>

          <TicketModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            ticket={selectedTicket}
          />
        </Container>
      </Box>
    </>
  );
};

export default MyTickets;
