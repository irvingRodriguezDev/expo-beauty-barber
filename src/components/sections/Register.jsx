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
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const visitorTypes = [
  "Profesional de la belleza",
  "Barbero",
  "Maquillador/a",
  "Estudiante de academia",
  "Dueño/a de salón",
  "Distribuidor",
  "Emprendedor del sector",
  "Otro",
];

// Genera un código legible: EBB-XXXX
function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "EBB-";
  for (let i = 0; i < 6; i++)
    code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Descarga el QR como imagen PNG
function downloadQR(code) {
  const svg = document.getElementById("qr-svg");
  if (!svg) return;
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const img = new Image();
  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    // Background
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, 400, 500);
    // Gold top bar
    const grad = ctx.createLinearGradient(0, 0, 400, 0);
    grad.addColorStop(0, "#C9A84C");
    grad.addColorStop(1, "#E8C96A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 400, 6);
    // QR
    ctx.drawImage(img, 75, 40, 250, 250);
    // Event name
    ctx.fillStyle = "#F5F0E8";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("EXPO BEAUTY & BARBER EMPRENDE", 200, 330);
    ctx.fillStyle = "#888";
    ctx.font = "13px sans-serif";
    ctx.fillText("14, 15 y 16 de Marzo 2026 · WTC CDMX", 200, 355);
    // Code
    ctx.fillStyle = "#C9A84C";
    ctx.font = "bold 22px monospace";
    ctx.fillText(code, 200, 405);
    ctx.fillStyle = "#555";
    ctx.font = "11px sans-serif";
    ctx.fillText("Presenta este código en la entrada", 200, 430);
    // Bottom bar
    ctx.fillStyle = grad;
    ctx.fillRect(0, 494, 400, 6);
    // Download
    const a = document.createElement("a");
    a.download = `registro-${code}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

export default function Register() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState("idle"); // idle | success
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

  const handleReset = () => {
    setStatus("idle");
    setRegistration(null);
    reset();
  };

  return (
    <Box
      ref={ref}
      component='section'
      id='registro'
      sx={{
        py: 16,
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232,64,122,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth={false} sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant='overline'
              display='block'
              sx={{ mb: 2, color: "#E8407A" }}
            >
              Registro de visitantes
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                color: "#F5F0E8",
                mb: 1,
              }}
            >
              Regístrate gratis
            </Typography>
            <Typography variant='body1' sx={{ maxWidth: 480, mx: "auto" }}>
              Obtén tu pase de acceso al instante. Presenta el QR en la entrada
              del evento.
            </Typography>
          </Box>
        </motion.div>

        <AnimatePresence mode='wait'>
          {status === "idle" ? (
            /* ── FORM ── */
            <motion.div
              key='form'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  maxWidth: 520,
                  mx: "auto",
                  p: { xs: 4, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Form header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      background: "rgba(232,64,122,0.1)",
                      border: "1px solid rgba(232,64,122,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PersonIcon sx={{ color: "#E8407A", fontSize: 18 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#F5F0E8",
                    }}
                  >
                    Datos de acceso
                  </Typography>
                </Box>

                <Divider />

                <TextField
                  label='Nombre completo'
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre ? "Campo requerido" : ""}
                  {...register("nombre", { required: true })}
                />
                <TextField
                  label='Email'
                  type='email'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? "Email inválido" : ""}
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                />
                <TextField
                  label='Teléfono'
                  fullWidth
                  error={!!errors.telefono}
                  helperText={errors.telefono ? "Campo requerido" : ""}
                  {...register("telefono", { required: true })}
                />
                <TextField
                  select
                  label='Tipo de visitante'
                  fullWidth
                  defaultValue=''
                  error={!!errors.tipo}
                  {...register("tipo", { required: true })}
                >
                  {visitorTypes.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  size='large'
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Obtener mi pase QR
                </Button>

                <Typography
                  variant='caption'
                  sx={{ textAlign: "center", color: "#444" }}
                >
                  Registro gratuito · Entrada libre al evento
                </Typography>
              </Paper>
            </motion.div>
          ) : (
            /* ── SUCCESS + QR ── */
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ maxWidth: 520, mx: "auto" }}>
                <Paper sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
                  {/* Header */}
                  <CheckCircleOutlineIcon
                    sx={{ color: "#E8407A", fontSize: 44, mb: 2 }}
                  />
                  <Typography
                    variant='h3'
                    sx={{ fontSize: "1.8rem", color: "#F5F0E8", mb: 1 }}
                  >
                    ¡Registro exitoso!
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 4 }}>
                    Hola{" "}
                    <Box
                      component='span'
                      sx={{ color: "#F5F0E8", fontWeight: 600 }}
                    >
                      {registration.nombre}
                    </Box>
                    , tu pase está listo.
                  </Typography>

                  <Divider sx={{ mb: 4 }} />

                  {/* QR */}
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      background: "#F5F0E8",
                      p: 3,
                      mb: 3,
                    }}
                  >
                    <QRCodeSVG
                      id='qr-svg'
                      value={`EXPO-BEAUTY-BARBER-2026|${registration.code}|${registration.nombre}|${registration.email}`}
                      size={200}
                      bgColor='#F5F0E8'
                      fgColor='#0A0A0A'
                      level='H'
                      includeMargin={false}
                    />
                  </Box>

                  {/* Code */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1.5,
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#C9A84C",
                      }}
                    >
                      {registration.code}
                    </Typography>
                    <Button
                      size='small'
                      variant='outlined'
                      color='primary'
                      onClick={handleCopy}
                      sx={{
                        minWidth: "auto",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "0.65rem",
                      }}
                      startIcon={
                        <ContentCopyIcon sx={{ fontSize: "14px !important" }} />
                      }
                    >
                      {copied ? "¡Copiado!" : "Copiar"}
                    </Button>
                  </Box>

                  {/* Event info */}
                  <Box
                    sx={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      p: 2.5,
                      mb: 4,
                    }}
                  >
                    <Typography
                      variant='caption'
                      display='block'
                      sx={{ color: "#777", mb: 0.5 }}
                    >
                      Evento
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "#F5F0E8",
                        mb: 0.25,
                      }}
                    >
                      Expo Beauty & Barber Emprende 2026
                    </Typography>
                    <Typography variant='caption' sx={{ color: "#ABABAB" }}>
                      14, 15 y 16 de Marzo · WTC Ciudad de México
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadQR(registration.code)}
                    >
                      Descargar QR
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      onClick={handleReset}
                    >
                      Nuevo registro
                    </Button>
                  </Box>

                  <Typography
                    variant='caption'
                    sx={{ display: "block", mt: 3, color: "#444" }}
                  >
                    Presenta este código en la entrada del evento
                  </Typography>
                </Paper>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
