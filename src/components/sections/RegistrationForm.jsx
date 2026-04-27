import {
  Paper,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

export const RegistrationForm = ({
  selectedPass,
  onSubmit,
  visitorTypes,
  inputStyles,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [openPolicy, setOpenPolicy] = useState(false);

  // --- PALETA COHERENTE WAPIZIMA ---
  const brandPink = "#E53888";
  const deepText = "#3D2B2F";

  // Regex para validar nombre y apellido
  const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const handleInternalSubmit = (data) => {
    const cleanData = {
      ...data,
      phone: data.phone.replace(/[\s-]/g, ""),
    };
    onSubmit(cleanData);
  };

  return (
    <motion.div
      key='form'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 550, // Un poco más estrecho para que se vea mejor centrado
          mx: "auto",
          p: { xs: 3, md: 5 },
          background: "#FFFFFF",
          borderRadius: 2, // Bordes más redondeados para el estilo premium
          border: `1px solid rgba(229, 56, 136, 0.15)`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(61, 43, 47, 0.08)",
        }}
      >
        {/* Línea decorativa superior */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: `linear-gradient(90deg, ${brandPink}, #D82E7A)`,
          }}
        />

        <form onSubmit={handleSubmit(handleInternalSubmit)}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: brandPink,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                7º Aniversario Wapizima
              </Typography>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.8rem",
                  color: deepText,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {selectedPass.title}
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "rgba(61, 43, 47, 0.5)", fontWeight: 600 }}
              >
                Completa tus datos para recibir tu boleto digital.
              </Typography>
            </Box>

            <TextField
              label='NOMBRE COMPLETO'
              fullWidth
              autoComplete='off'
              {...register("fullname", {
                required: "El nombre es obligatorio",
                pattern: {
                  value: nameRegex,
                  message: "Ingresa nombre y apellido",
                },
              })}
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              sx={inputStyles}
            />

            <TextField
              label='EMAIL'
              fullWidth
              autoComplete='off'
              {...register("email", {
                required: "Email obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={inputStyles}
            />
            <TextField
              label='WHATSAPP'
              fullWidth
              autoComplete='off'
              placeholder='10 dígitos'
              {...register("phone", {
                required: "Teléfono obligatorio",
                pattern: {
                  value: phoneRegex,
                  message: "Número inválido",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={inputStyles}
            />

            <TextField
              label='TU ACADEMIA O SALÓN'
              fullWidth
              autoComplete='off'
              {...register("businessName")}
              sx={inputStyles}
            />

            <TextField
              select
              label='PERFIL PROFESIONAL'
              fullWidth
              {...register("profile", { required: "Selecciona tu perfil" })}
              error={!!errors.profile}
              sx={inputStyles}
            >
              {visitorTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            <Box>
              <FormControlLabel
                control={
                  <Controller
                    name='acceptTerms'
                    control={control}
                    rules={{ required: "Debes aceptar los términos" }}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={!!value}
                        onChange={onChange}
                        sx={{
                          "&.Mui-checked": { color: brandPink },
                        }}
                      />
                    )}
                  />
                }
                label={
                  <Typography
                    variant='caption'
                    sx={{ color: "rgba(61, 43, 47, 0.7)" }}
                  >
                    He leído y acepto la{" "}
                    <span
                      style={{
                        color: brandPink,
                        cursor: "pointer",
                        fontWeight: 700,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenPolicy(true);
                      }}
                    >
                      Política de Privacidad
                    </span>
                  </Typography>
                }
              />
              {errors.acceptTerms && (
                <Typography
                  variant='caption'
                  sx={{ color: "#d32f2f", display: "block", ml: 4 }}
                >
                  {errors.acceptTerms.message}
                </Typography>
              )}
            </Box>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={isSubmitting}
              sx={{
                py: 2,
                bgcolor: brandPink, // El botón ahora es rosa para que resalte más
                color: "#FFFFFF",
                borderRadius: "12px",
                fontWeight: 900,
                fontSize: "1rem",
                boxShadow: `0 10px 25px rgba(229, 56, 136, 0.3)`,
                "&:hover": {
                  bgcolor: deepText,
                  transform: "translateY(-2px)",
                  color: "#FFFFFF",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
              ) : (
                `COMPRAR POR $${selectedPass.price} MXN`
              )}
            </Button>
          </Stack>
        </form>

        <PrivacyPolicyModal
          open={openPolicy}
          onClose={() => setOpenPolicy(false)}
        />
      </Paper>
    </motion.div>
  );
};
