import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const visitorTypes = [
  "Profesional de la Belleza",
  "Barbero / Hair Stylist",
  "Maquillador Profesional",
  "Estudiante de Academia",
  "Dueño de Salón / Spa",
  "Distribuidor / Mayorista",
  "Emprendedor",
];

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "EBB-";
  for (let i = 0; i < 6; i++)
    code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState("idle");
  const [registration, setRegistration] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const code = generateCode();
    setRegistration({ ...data, code });
    setStatus("success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(registration.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      ref={ref}
      component='section'
      id='registro'
      sx={{
        py: { xs: 12, md: 20 },
        background: "linear-gradient(180deg, #F9A8D4 0%, #FAF8F5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth='lg' sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              sx={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.4em",
                color: "#BE185D",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              ACCESO EXCLUSIVO
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: "2.8rem", md: "4.5rem" },
                fontWeight: 800,
                color: "#2D0A1A",
                mb: 2,
              }}
            >
              Obtén tu{" "}
              <span
                className='gradient-text'
                style={{ fontStyle: "italic", fontWeight: 500 }}
              >
                Pase Digital
              </span>
            </Typography>
            <Typography
              variant='body1'
              sx={{
                maxWidth: 600,
                mx: "auto",
                color: "#7D4A5F",
                fontSize: "1.1rem",
              }}
            >
              El registro es gratuito por tiempo limitado. Asegura tu lugar en
              el evento más importante de la industria.
            </Typography>
          </motion.div>
        </Box>

        <AnimatePresence mode='wait'>
          {status === "idle" ? (
            <motion.div
              key='form'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={0}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  p: { xs: 4, md: 8 },
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  borderRadius: 0, // Estética minimalista
                  boxShadow: "0 40px 100px rgba(45, 10, 26, 0.08)",
                }}
              >
                <Stack spacing={3}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <LocalActivityIcon sx={{ color: "#EC4899" }} />
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      FORMULARIO DE REGISTRO
                    </Typography>
                  </Box>

                  <TextField
                    variant='standard'
                    label='NOMBRE COMPLETO'
                    fullWidth
                    error={!!errors.nombre}
                    {...register("nombre", { required: true })}
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <TextField
                      variant='standard'
                      label='EMAIL CORPORATIVO'
                      type='email'
                      fullWidth
                      error={!!errors.email}
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/,
                      })}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "0.7rem",
                          letterSpacing: "0.2em",
                        },
                      }}
                    />
                    <TextField
                      variant='standard'
                      label='TELÉFONO'
                      fullWidth
                      error={!!errors.telefono}
                      {...register("telefono", { required: true })}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "0.7rem",
                          letterSpacing: "0.2em",
                        },
                      }}
                    />
                  </Box>

                  <TextField
                    select
                    variant='standard'
                    label='PERFIL PROFESIONAL'
                    fullWidth
                    defaultValue=''
                    error={!!errors.tipo}
                    {...register("tipo", { required: true })}
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                      },
                    }}
                  >
                    {visitorTypes.map((t) => (
                      <MenuItem
                        key={t}
                        value={t}
                        sx={{ fontSize: "0.9rem", fontFamily: "Syne" }}
                      >
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{
                      mt: 4,
                      py: 2.5,
                      bgcolor: "#2D0A1A",
                      color: "#FFF",
                      borderRadius: 0,
                      fontWeight: 800,
                      fontFamily: "'Syne'",
                      letterSpacing: "0.2em",
                      "&:hover": { bgcolor: "#BE185D" },
                    }}
                  >
                    GENERAR MI BOLETO
                  </Button>
                </Stack>
              </Paper>
            </motion.div>
          ) : (
            /* ── SUCCESS: TICKET LOOK ── */
            <motion.div
              key='success'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ maxWidth: 500, mx: "auto" }}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "#371022f4",
                    color: "#FFF",
                    p: 0,
                    borderRadius: 0,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Ticket Header */}
                  <Box
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderBottom: "1px dashed rgba(255,255,255,0.2)",
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: "#EC4899", fontSize: 40, mb: 2 }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                      }}
                    >
                      REGISTRO CONFIRMADO
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        opacity: 0.6,
                        letterSpacing: "0.1em",
                      }}
                    >
                      BIENVENIDO/A, {registration.nombre.toUpperCase()}
                    </Typography>
                  </Box>

                  {/* Ticket Body */}
                  <Box sx={{ p: 6, textAlign: "center" }}>
                    <Box
                      sx={{
                        background: "#FFF",
                        p: 3,
                        display: "inline-block",
                        mb: 4,
                      }}
                    >
                      <QRCodeSVG
                        value={`EBB-2026-${registration.code}`}
                        size={180}
                        level='H'
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontFamily: "'Syne'",
                        fontSize: "2rem",
                        fontWeight: 800,
                        color: "#F9A8D4",
                        mb: 1,
                      }}
                    >
                      {registration.code}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        opacity: 0.5,
                        letterSpacing: "0.2em",
                        mb: 4,
                      }}
                    >
                      PRESENTA ESTE CÓDIGO AL INGRESAR
                    </Typography>

                    <Stack spacing={2}>
                      <Button
                        variant='outlined'
                        fullWidth
                        startIcon={<DownloadIcon />}
                        sx={{
                          color: "#FFF",
                          borderColor: "rgba(255,255,255,0.3)",
                          borderRadius: 0,
                        }}
                      >
                        GUARDAR EN DISPOSITIVO
                      </Button>
                      <Button
                        variant='text'
                        onClick={() => setStatus("idle")}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.7rem",
                        }}
                      >
                        REALIZAR OTRO REGISTRO
                      </Button>
                    </Stack>
                  </Box>

                  {/* Ticket Footer Decor */}
                  <Box
                    sx={{
                      height: 10,
                      background: "linear-gradient(90deg, #F9A8D4, #BE185D)",
                    }}
                  />
                </Paper>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
