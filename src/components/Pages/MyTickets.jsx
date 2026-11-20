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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TicketModal } from "../Modal/TicketModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import MethodGet from "../../config/service";
import Navbar from "../../components/Layout/Navbar";

const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const brandPink = "#E53888";
  const champagneGold = "#C5A059";
  const deepText = "#2B1E22";
  const mutedText = "#6E5D62";
  const softPinkBg = "#FFF5F8";

  const fetchTickets = useCallback(
    async (isSilent = false) => {
      if (!email || !executeRecaptcha) return;
      if (!isSilent) {
        setLoading(true);
      }
      try {
        await executeRecaptcha("ticket_search");
        const response = await MethodGet(
          `/ticket/search?email=${email.toLowerCase().trim()}`,
        );

        setTickets(response.data.tickets || []);
        setSearched(true);
      } catch (err) {
        console.error("Error en fetchTickets:", err);
      } finally {
        if (!isSilent) setLoading(false);
      }
    },
    [email, executeRecaptcha],
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTickets();
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 50% 15%, rgba(229, 56, 136, 0.08) 0%, rgba(255, 245, 248, 0.65) 38%, #FFFFFF 75%)",
          minHeight: "100dvh",
          py: { xs: 7, md: 10 },
          px: 2,
          position: "relative",
          overflow: "hidden",
          fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        }}
      >
        {/* Destellos decorativos sutiles en rosa y dorado champán */}
        <Box
          sx={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "440px",
            height: "440px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(229, 56, 136, 0.09) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(35px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-140px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(197, 160, 89, 0.13) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(35px)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth='md' sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={6} alignItems='center'>
            {/* Header Elegante */}
            <Box sx={{ textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Chip
                  label='✦ WAPIZIMA • PORTAL DE INVITADOS ✦'
                  sx={{
                    bgcolor: softPinkBg,
                    color: brandPink,
                    border: "1px solid rgba(229, 56, 136, 0.24)",
                    fontWeight: 700,
                    fontSize: { xs: "0.68rem", sm: "0.76rem" },
                    letterSpacing: "2.2px",
                    px: 1.5,
                    py: 2,
                    borderRadius: "999px",
                    mb: 2.5,
                  }}
                />
                <Typography
                  variant='h1'
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.6rem", sm: "4rem", md: "4.8rem" },
                    color: deepText,
                    lineHeight: 0.98,
                    letterSpacing: "-1.5px",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  BUSCA TUS{" "}
                  <Box
                    component='span'
                    sx={{
                      fontStyle: "italic",
                      background: `linear-gradient(135deg, ${brandPink} 15%, ${champagneGold} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      px: 0.5,
                    }}
                  >
                    BOLETOS
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    color: mutedText,
                    fontSize: { xs: "0.92rem", sm: "1rem" },
                    maxWidth: 460,
                    mx: "auto",
                    fontWeight: 500,
                  }}
                >
                  Ingresa el correo con el que realizaste tu compra para ver y
                  descargar tus pases digitales.
                </Typography>
              </motion.div>
            </Box>

            {/* Buscador Elegante */}
            <Paper
              component='form'
              onSubmit={handleSubmit}
              elevation={0}
              sx={{
                p: 0.8,
                borderRadius: "999px",
                bgcolor: "#FFFFFF",
                width: "100%",
                maxWidth: 520,
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(197, 160, 89, 0.35)",
                boxShadow: "0 14px 36px rgba(43, 30, 34, 0.06)",
                transition: "all 0.25s ease",
                "&:focus-within": {
                  borderColor: brandPink,
                  boxShadow: "0 16px 40px rgba(229, 56, 136, 0.14)",
                },
              }}
            >
              <TextField
                fullWidth
                type='email'
                placeholder='Ingresa tu correo electrónico'
                variant='standard'
                value={email}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <MailOutlineIcon
                      sx={{ ml: 2, mr: 1.2, color: brandPink }}
                    />
                  ),
                  sx: {
                    fontWeight: 600,
                    color: deepText,
                    fontSize: { xs: "0.9rem", sm: "0.98rem" },
                  },
                }}
              />
              <IconButton
                type='submit'
                disabled={loading}
                sx={{
                  background: `linear-gradient(135deg, ${brandPink} 0%, #C8236E 100%)`,
                  color: "#FFFFFF",
                  width: 48,
                  height: 48,
                  boxShadow: "0 8px 20px rgba(229, 56, 136, 0.28)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #D82E7A 0%, #AD1A5D 100%)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color='inherit' />
                ) : (
                  <ArrowForwardIosIcon fontSize='small' />
                )}
              </IconButton>
            </Paper>

            {/* Lista de Tickets */}
            <Grid container spacing={3} sx={{ pt: 1 }}>
              <AnimatePresence>
                {tickets.map((ticket, index) => (
                  <Grid item xs={12} md={6} key={ticket.code}>
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
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
                          borderRadius: "18px",
                          overflow: "hidden",
                          minHeight: 136,
                          cursor: "pointer",
                          position: "relative",
                          border: "1px solid rgba(197, 160, 89, 0.35)",
                          boxShadow: "0 12px 30px rgba(43, 30, 34, 0.05)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            borderColor: brandPink,
                            boxShadow: "0 18px 38px rgba(229, 56, 136, 0.14)",
                          },
                        }}
                      >
                        {/* Franja lateral elegante en rosa/magenta */}
                        <Box
                          sx={{
                            width: 44,
                            background: `linear-gradient(180deg, ${brandPink} 0%, #C8236E 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#FFFFFF",
                              transform: "rotate(-90deg)",
                              whiteSpace: "nowrap",
                              fontSize: "0.62rem",
                              fontWeight: 800,
                              letterSpacing: "0.2em",
                            }}
                          >
                            PASS #{ticket.code?.slice(-4)}
                          </Typography>
                        </Box>

                        {/* Cuerpo del Ticket */}
                        <Box
                          sx={{
                            flexGrow: 1,
                            p: 2.5,
                            pr: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              letterSpacing: "1.4px",
                              color: champagneGold,
                              textTransform: "uppercase",
                              mb: 0.4,
                            }}
                          >
                            Pase Digital
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: deepText,
                              fontSize: "1.05rem",
                              textTransform: "uppercase",
                              lineHeight: 1.2,
                            }}
                          >
                            {ticket.buyerName}
                          </Typography>
                          <Typography
                            sx={{
                              color: brandPink,
                              fontWeight: 700,
                              fontSize: "0.78rem",
                              mt: 0.6,
                            }}
                          >
                            {ticket.evento?.titulo ||
                              "Christmas Nails Wapizima"}
                          </Typography>
                        </Box>

                        {/* Muescas superiores e inferiores */}
                        <Box
                          sx={{
                            position: "absolute",
                            right: 66,
                            top: -10,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: "#FFF5F8",
                            border: "1px solid rgba(197, 160, 89, 0.35)",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: 66,
                            bottom: -10,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: "#FFF5F8",
                            border: "1px solid rgba(197, 160, 89, 0.35)",
                          }}
                        />
                        <Divider
                          orientation='vertical'
                          flexItem
                          sx={{
                            borderStyle: "dashed",
                            borderColor: "rgba(197, 160, 89, 0.5)",
                            my: 2,
                          }}
                        />

                        {/* Ícono lateral */}
                        <Box
                          sx={{
                            width: 76,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: softPinkBg,
                            flexShrink: 0,
                          }}
                        >
                          <ConfirmationNumberIcon
                            sx={{ color: brandPink, fontSize: 28 }}
                          />
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {searched && tickets.length === 0 && !loading && (
              <Paper
                elevation={0}
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: "16px",
                  bgcolor: softPinkBg,
                  border: "1px solid rgba(229, 56, 136, 0.2)",
                }}
              >
                <Typography
                  sx={{ color: mutedText, fontWeight: 600, fontSize: "0.9rem" }}
                >
                  No se encontraron boletos con ese correo. Verifica e intenta
                  de nuevo.
                </Typography>
              </Paper>
            )}

            {tickets.length > 0 && (
              <Typography
                variant='caption'
                sx={{
                  color: mutedText,
                  fontWeight: 600,
                  letterSpacing: "0.6px",
                }}
              >
                ✦ La lista se actualiza automáticamente cada 40 segundos
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
