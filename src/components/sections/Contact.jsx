import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const WHATSAPP_NUMBER = "521XXXXXXXXXX";
const CONTACT_EMAIL = "contacto@expobeautybarber.com";

const productTypes = [
  "Productos Capilares",
  "Barbería Profesional",
  "Maquillaje & Color",
  "Nails & Care",
  "Aparatología / Estética",
  "Mobiliario de Lujo",
  "Educación / Academia",
  "Otro",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const buildWaMessage = (d) =>
    `Hola, solicito información comercial para Expo Beauty & Barber 2027.%0A%0A*Marca:* ${d.empresa}%0A*Interés:* ${d.tipo_producto}`;

  const onSubmit = async (data) => {
    setStatus("sending");
    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWaMessage(data)}`,
        "_blank",
      );
      setStatus("success");
      reset();
    }, 1500);
  };

  return (
    <Box
      ref={ref}
      component='section'
      id='contacto'
      sx={{
        py: { xs: 12, md: 20 },
        // REGRESO AL ROSADO DE MARCA
        background: "linear-gradient(180deg, #FDF2F8 0%, #FCE7F3 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decoración de fondo (Aura rosa) */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" },
            gap: { xs: 8, lg: 15 },
            alignItems: "center",
          }}
        >
          {/* Lado Izquierdo: Copy Editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                // fontFamily: "'DM Sans'",
                fontSize: "0.75rem",
                fontWeight: 900,
                letterSpacing: "0.5em",
                color: "#BE185D",
                mb: 3,
              }}
            >
              NEGOCIOS E IMPULSO
            </Typography>
            <Typography
              variant='h2'
              sx={{
                // fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "3.5rem", md: "5rem" },
                fontWeight: 800,
                color: "#2D0A1A",
                lineHeight: 1,
                mb: 4,
                letterSpacing: "-0.02em",
              }}
            >
              Hablemos de tu <br />
              <span className='gradient-text'>visibilidad</span>
            </Typography>

            <Typography
              sx={{
                color: "#552F3F",
                fontSize: "1.1rem",
                mb: 6,
                maxWidth: 450,
                lineHeight: 1.8,
                opacity: 0.8,
              }}
            >
              Diseñamos espacios que no solo exhiben, sino que venden. Deja tus
              datos y un consultor senior te contactará personalmente.
            </Typography>

            <Stack spacing={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#FFF",
                    color: "#EC4899",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <EmailIcon fontSize='small' />
                </Box>
                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      letterSpacing: "0.3em",
                      color: "#BE185D",
                      fontWeight: 700,
                    }}
                  >
                    EMAIL
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: "'Syne'",
                      fontWeight: 800,
                      color: "#2D0A1A",
                    }}
                  >
                    {CONTACT_EMAIL}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#25D366",
                    color: "#FFF",
                    boxShadow: "0 10px 20px rgba(37, 211, 102, 0.2)",
                  }}
                >
                  <WhatsAppIcon fontSize='small' />
                </Box>
                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      letterSpacing: "0.3em",
                      color: "#128C7E",
                      fontWeight: 700,
                    }}
                  >
                    WHATSAPP BUSINESS
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: "'Syne'",
                      fontWeight: 800,
                      color: "#2D0A1A",
                    }}
                  >
                    +52 1 55 0000 0000
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </motion.div>

          {/* Lado Derecho: Formulario Estilo Glass Luxury */}
          <Box sx={{ position: "relative" }}>
            <AnimatePresence mode='wait'>
              {status === "success" ? (
                <motion.div
                  key='success'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box
                    sx={{
                      p: 10,
                      textAlign: "center",
                      bgcolor: "rgba(45, 10, 26, 0.95)",
                      color: "#FFF",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 50px 100px rgba(45, 10, 26, 0.2)",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: "#EC4899", fontSize: 60, mb: 3 }}
                    />
                    <Typography variant='h4' sx={{ fontWeight: 800, mb: 2 }}>
                      SOLICITUD ENVIADA
                    </Typography>
                    <Typography
                      sx={{ opacity: 0.7, mb: 4, fontFamily: "'DM Sans'" }}
                    >
                      Un consultor te contactará en menos de 24 horas.
                    </Typography>
                    <Button
                      onClick={() => setStatus("idle")}
                      sx={{
                        color: "#062C22",
                        // fontFamily: "'Syne'",
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                      }}
                    >
                      VOLVER AL FORMULARIO
                    </Button>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key='form'
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                      p: { xs: 5, md: 8 },
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 0,
                      border: "1px solid #FFF",
                      boxShadow: "0 40px 100px rgba(190, 24, 93, 0.1)",
                    }}
                  >
                    <Stack spacing={5}>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                          gap: 5,
                        }}
                      >
                        <TextField
                          variant='standard'
                          label='NOMBRE COMPLETO'
                          fullWidth
                          error={!!errors.nombre}
                          {...register("nombre", { required: true })}
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              fontWeight: 800,
                              color: "#7D4A5F",
                            },
                          }}
                        />
                        <TextField
                          variant='standard'
                          label='EMPRESA'
                          fullWidth
                          error={!!errors.empresa}
                          {...register("empresa", { required: true })}
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              fontWeight: 800,
                              color: "#7D4A5F",
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                          gap: 5,
                        }}
                      >
                        <TextField
                          variant='standard'
                          label='TELÉFONO'
                          fullWidth
                          error={!!errors.telefono}
                          {...register("telefono", { required: true })}
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              fontWeight: 800,
                              color: "#7D4A5F",
                            },
                          }}
                        />
                        <TextField
                          variant='standard'
                          label='EMAIL BUSINESS'
                          type='email'
                          fullWidth
                          error={!!errors.email}
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+\.\S+$/,
                          })}
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "0.65rem",
                              letterSpacing: "0.2em",
                              fontWeight: 800,
                              color: "#7D4A5F",
                            },
                          }}
                        />
                      </Box>

                      <Controller
                        name='tipo_producto'
                        control={control}
                        rules={{ required: true }}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            select
                            variant='standard'
                            label='CATEGORÍA DE INTERÉS'
                            fullWidth
                            error={!!errors.tipo_producto}
                            {...field}
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "0.65rem",
                                letterSpacing: "0.2em",
                                fontWeight: 800,
                                color: "#7D4A5F",
                              },
                            }}
                          >
                            {productTypes.map((t) => (
                              <MenuItem
                                key={t}
                                value={t}
                                sx={{ fontWeight: 600 }}
                              >
                                {t.toUpperCase()}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />

                      <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        disabled={status === "sending"}
                        endIcon={
                          status === "sending" ? (
                            <CircularProgress size={20} color='inherit' />
                          ) : (
                            <ArrowForwardIcon />
                          )
                        }
                        sx={{
                          bgcolor: "#2D0A1A",
                          color: "#FFF",
                          borderRadius: 0,
                          py: 3,
                          fontWeight: 900,
                          // fontFamily: "'Syne'",
                          letterSpacing: "0.3em",
                          fontSize: "0.8rem",
                          "&:hover": {
                            bgcolor: "#EC4899",
                            boxShadow: "0 20px 40px rgba(236,72,153,0.3)",
                          },
                        }}
                      >
                        {status === "sending"
                          ? "PROCESANDO..."
                          : "SOLICITAR PROPUESTA"}
                      </Button>
                    </Stack>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
