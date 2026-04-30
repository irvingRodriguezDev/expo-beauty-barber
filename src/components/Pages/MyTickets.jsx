import React, { useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TicketModal } from "../Modal/TicketModal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
const MyTickets = () => {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Paleta Rosa Monocromática Armoniosa
  const basePink = "#FFD9E2"; // El fondo que pediste
  const brandPink = "#ee6f97"; // Rosa fuerte principal (texto acento y botones)
  const softPink = "#FFF0F3"; // Rosa muy suave (fondo de inputs/tarjetas)
  const borderPink = "rgba(238, 111, 151, 0.2)"; // Borde suave rosa fuerte
  const textDeepPink = "#8A4F5F"; // Rosa oscuro sutil (para texto base legible)

  const fetchTickets = useCallback(
    async (isSilent = false) => {
      if (!email || !executeRecaptcha) return;
      if (!isSilent) setLoading(true);
      try {
        const captchaToken = await executeRecaptcha("search_tickets");
        const response = await axios.get(
          `https://api.beautyworldmexico.com.mx/search-tickets`,
          {
            params: { email: email.toLowerCase().trim(), captchaToken },
          },
        );
        setTickets(response.data.tickets || []);
        setSearched(true);
      } catch (err) {
        console.error(err);
      } finally {
        if (!isSilent) setLoading(false);
      }
    },
    [email, executeRecaptcha],
  );

  return (
    <>
      <Box
        sx={{
          bgcolor: basePink,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: 10,
          px: 2,
        }}
      >
        <Container maxWidth='sm'>
          <Stack spacing={6} alignItems='center'>
            {/* Header Minimalista Rosa */}
            <Box sx={{ textAlign: "center" }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ConfirmationNumberIcon
                  sx={{
                    color: brandPink,
                    fontSize: 40,
                    mb: 2,
                    filter: `drop-shadow(0 0 8px ${brandPink}33)`,
                  }}
                />
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 900,
                    color: textDeepPink, // Rosa oscuro sutil para legibilidad
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    mb: 1,
                    // fontFamily: "'Syne', sans-serif", // Descomenta si usas Syne
                  }}
                >
                  MIS <span style={{ color: brandPink }}>BOLETOS</span>
                </Typography>
                <Typography
                  sx={{
                    color: textDeepPink,
                    opacity: 0.7,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Consulta y presenta tus accesos para Beauty World Mexico 2027.
                </Typography>
              </motion.div>
            </Box>

            {/* Buscador Estilo "Soft Lounge" */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              sx={{
                width: "100%",
                p: "1px",
                background: `linear-gradient(to right, ${brandPink}66, transparent)`,
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(138, 79, 95, 0.08)", // Sombra sutil rosa
              }}
            >
              <Box
                sx={{
                  bgcolor: "#FFF", // Fondo blanco limpio para contraste suave
                  borderRadius: "19px",
                  p: 4,
                  border: `1px solid ${borderPink}`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    marginTop: -2,
                    marginBottom: 1,
                  }}
                >
                  <Link to={"/"}>
                    <Tooltip title='Volver al inicio' placement='top'>
                      <IconButton variant='outlined' size='small'>
                        <ArrowBackIcon
                          sx={{ color: "#8E5463", fontSize: "30px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  placeholder='CORREO ELECTRÓNICO'
                  variant='standard'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchTickets()}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MailOutlineIcon
                          sx={{
                            color: brandPink,
                            opacity: 0.5,
                            fontSize: 20,
                            mr: 1,
                          }}
                        />
                      </InputAdornment>
                    ),
                    sx: {
                      color: textDeepPink,
                      height: "55px",
                      bgcolor: softPink, // Rosa muy suave de fondo
                      borderRadius: "12px",
                      px: 2,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      border: `1px solid ${borderPink}`,
                      "& input::placeholder": {
                        color: textDeepPink,
                        opacity: 0.4,
                      },
                    },
                  }}
                />
                <Button
                  fullWidth
                  onClick={() => fetchTickets()}
                  disabled={loading}
                  startIcon={!loading && <SearchIcon />}
                  sx={{
                    mt: 3,
                    height: "55px",
                    borderRadius: "12px",
                    bgcolor: brandPink,
                    color: "#FFF", // Texto blanco sobre rosa fuerte
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    boxShadow: `0 8px 20px ${brandPink}33`,
                    "&:hover": {
                      bgcolor: brandPink,
                      opacity: 0.9,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    "&.Mui-disabled": {
                      bgcolor: `${brandPink}66`,
                      color: "#FFF",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    "BUSCAR MIS ACCESOS"
                  )}
                </Button>
              </Box>
            </Box>

            {/* Resultados - Layout de Tickets Digitales Rosas */}
            <Grid container spacing={2}>
              <AnimatePresence>
                {tickets.map((ticket, index) => (
                  <Grid item xs={12} key={ticket.ticketCode}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -3 }}
                    >
                      <Box
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setModalOpen(true);
                        }}
                        sx={{
                          display: "flex",
                          bgcolor: "#FFF", // Fondo blanco para limpieza
                          borderRadius: "16px",
                          border: `1px solid ${borderPink}`,
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 5px 15px rgba(138, 79, 95, 0.04)",
                          "&:hover": {
                            borderColor: brandPink,
                            boxShadow: `0 10px 25px ${brandPink}11`,
                          },
                        }}
                      >
                        {/* Acento Lateral Rosa Fuerte */}
                        <Box sx={{ width: 6, bgcolor: brandPink }} />

                        <Stack
                          direction='row'
                          sx={{
                            p: 3,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                color: brandPink,
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                letterSpacing: "0.2em",
                                mb: 0.5,
                              }}
                            >
                              PASS #{ticket.ticketCode.slice(-4)}
                            </Typography>
                            <Typography
                              sx={{
                                color: textDeepPink,
                                fontWeight: 800,
                                fontSize: "1rem",
                                textTransform: "uppercase",
                              }}
                            >
                              {ticket.fullname}
                            </Typography>
                            <Typography
                              sx={{
                                color: textDeepPink,
                                opacity: 0.6,
                                fontSize: "0.7rem",
                                mt: 0.5,
                                fontWeight: 600,
                              }}
                            >
                              BEAUTY WORLD MEXICO 2027
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              textAlign: "right",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                color: brandPink,
                                fontSize: "0.7rem",
                                fontWeight: 800,
                                mr: 1,
                              }}
                            >
                              DETALLE
                            </Typography>
                            <ArrowForwardIcon
                              sx={{ color: brandPink, fontSize: 16 }}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>

            {searched && tickets.length === 0 && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography
                  sx={{
                    color: textDeepPink,
                    opacity: 0.5,
                    fontSize: "0.9rem",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  No se encontraron registros asociados.
                </Typography>
              </motion.div>
            )}
          </Stack>

          <TicketModal
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            ticket={selectedTicket}
          />
        </Container>

        {/* Recaptcha Badge - Ajuste visual opcional */}
        <style>{`
        .grecaptcha-badge { visibility: hidden; }
      `}</style>
      </Box>
    </>
  );
};

export default MyTickets;
