import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, Controller } from "react-hook-form";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "521XXXXXXXXXX";
const CONTACT_EMAIL = "contacto@expobeautybarber.com";
const EMAILJS_SERVICE_ID = "";
const EMAILJS_TEMPLATE_ID = "";
const EMAILJS_PUBLIC_KEY = "";
// ─────────────────────────────────────────────────────────────────────────────

const productTypes = [
  "Productos capilares",
  "Barbería",
  "Maquillaje",
  "Uñas",
  "Estética",
  "Equipos y mobiliario",
  "Academia / Educación",
  "Otro",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const buildWaMessage = (d) =>
    `Hola, me interesa exponer en Expo Beauty & Barber 2026.%0A%0A*Nombre:* ${d.nombre}%0A*Empresa:* ${d.empresa}%0A*Teléfono:* ${d.telefono}%0A*Email:* ${d.email}%0A*Tipo de producto:* ${d.tipo_producto}`;

  const onSubmit = async (data) => {
    setStatus("sending");
    if (EMAILJS_SERVICE_ID) {
      try {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: data.nombre,
            empresa: data.empresa,
            telefono: data.telefono,
            reply_to: data.email,
            tipo_producto: data.tipo_producto,
            mensaje: data.mensaje || "",
          },
          EMAILJS_PUBLIC_KEY,
        );
        setStatus("success");
        reset();
        return;
      } catch (e) {
        console.error(e);
      }
    }
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWaMessage(data)}`,
      "_blank",
    );
    setStatus("success");
    reset();
  };

  return (
    <Box
      ref={ref}
      component='section'
      sx={{
        py: 16,
        background: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth={false}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 10,
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography variant='overline' display='block' sx={{ mb: 2 }}>
              Contacto
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                color: "#F5F0E8",
                mb: 0.5,
              }}
            >
              Solicita información
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: "clamp(2.2rem, 4vw, 4rem)",
                background:
                  "linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
              }}
            >
              para exponer
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background: "linear-gradient(90deg, #C9A84C, #E8407A)",
                mb: 4,
              }}
            />
            <Typography variant='body1' sx={{ mb: 6, maxWidth: 420 }}>
              Completa el formulario y un asesor te contactará en menos de 24
              horas con toda la información de paquetes y disponibilidad de
              stands.
            </Typography>

            {[
              {
                Icon: EmailIcon,
                label: "Email",
                value: CONTACT_EMAIL,
                href: `mailto:${CONTACT_EMAIL}`,
                color: "#C9A84C",
              },
              {
                Icon: WhatsAppIcon,
                label: "WhatsApp",
                value: "Ventas directas",
                href: `https://wa.me/${WHATSAPP_NUMBER}`,
                color: "#25D366",
              },
            ].map(({ Icon, label, value, href, color }, i) => (
              <Box
                key={i}
                component='a'
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  textDecoration: "none",
                  "&:hover .contact-text": { color: "#F5F0E8" },
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    "&:hover": { borderColor: color },
                  }}
                >
                  <Icon sx={{ color, fontSize: 17 }} />
                </Box>
                <Box>
                  <Typography
                    variant='caption'
                    sx={{
                      color: "#555",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    className='contact-text'
                    variant='body2'
                    sx={{ transition: "color 0.2s" }}
                  >
                    {value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <Paper
                sx={{
                  p: 8,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 400,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: "#C9A84C", fontSize: 48, mb: 3 }}
                />
                <Typography
                  variant='h3'
                  sx={{ fontSize: "2rem", color: "#F5F0E8", mb: 1.5 }}
                >
                  ¡Mensaje enviado!
                </Typography>
                <Typography variant='body2' sx={{ mb: 4 }}>
                  Un asesor te contactará pronto.
                </Typography>
                <Button
                  variant='outlined'
                  color='primary'
                  size='small'
                  onClick={() => setStatus("idle")}
                >
                  Enviar otro mensaje
                </Button>
              </Paper>
            ) : (
              <Paper
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <TextField
                  label='Nombre completo'
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre ? "Campo requerido" : ""}
                  {...register("nombre", { required: true })}
                />
                <TextField
                  label='Empresa / Marca'
                  fullWidth
                  error={!!errors.empresa}
                  helperText={errors.empresa ? "Campo requerido" : ""}
                  {...register("empresa", { required: true })}
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <TextField
                    label='Teléfono'
                    fullWidth
                    error={!!errors.telefono}
                    {...register("telefono", { required: true })}
                  />
                  <TextField
                    label='Email'
                    type='email'
                    fullWidth
                    error={!!errors.email}
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+\.\S+$/,
                    })}
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
                      label='Tipo de producto / servicio'
                      fullWidth
                      error={!!errors.tipo_producto}
                      {...field}
                    >
                      {productTypes.map((t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <TextField
                  label='Mensaje (opcional)'
                  multiline
                  rows={3}
                  fullWidth
                  {...register("mensaje")}
                />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  fullWidth
                  disabled={status === "sending"}
                  endIcon={
                    status === "sending" ? (
                      <CircularProgress size={16} color='inherit' />
                    ) : (
                      <SendIcon />
                    )
                  }
                  sx={{ mt: 1 }}
                >
                  {status === "sending"
                    ? "Enviando..."
                    : "Solicitar información"}
                </Button>
                <Typography
                  variant='caption'
                  sx={{ textAlign: "center", color: "#444" }}
                >
                  Al enviar aceptas nuestra{" "}
                  <Box
                    component='a'
                    href='#'
                    sx={{ color: "#666", "&:hover": { color: "#ABABAB" } }}
                  >
                    Política de Privacidad
                  </Box>
                </Typography>
              </Paper>
            )}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
