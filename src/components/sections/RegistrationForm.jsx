import {
  Paper,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Box,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

export const RegistrationForm = ({
  selectedPass,
  onBack,
  onSubmit, // Función que viene del padre para ir a Stripe
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
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

  // Validaciones
  const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s[a-zA-ZÀ-ÿ\u00f1\u00d1]+)+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  // Función interna para procesar antes de enviar al padre
  const handleInternalSubmit = (data) => {
    // Limpiamos el teléfono de espacios o guiones antes de enviar a Stripe/DB
    const cleanData = {
      ...data,
      phone: data.phone.replace(/[\s-]/g, ""),
    };
    onSubmit(cleanData); // AQUÍ ejecutamos la redirección a Stripe
  };

  return (
    <motion.div
      key='form'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 650,
          mx: "auto",
          p: { xs: 4, md: 8 },
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          border: `1px solid rgba(114, 248, 255, 0.1)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${brandCyan}, transparent)`,
          }}
        />

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: brandCyan,
            mb: 5,
            fontSize: "0.7rem",
            fontWeight: 800,
            borderRadius: 4,
            letterSpacing: "0.2em",
            "&:hover": { bgcolor: "transparent", color: "#FFF" },
          }}
        >
          CAMBIAR TIPO DE PASE
        </Button>

        {/* Cambiamos el onSubmit para que use nuestra función interna validada */}
        <form onSubmit={handleSubmit(handleInternalSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: brandCyan,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Inscripción de Profesional
              </Typography>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  color: "#FFFFFF",
                  borderBottom: `1px solid rgba(114, 248, 255, 0.1)`,
                  pb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {selectedPass.title}
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 4,
                    bgcolor: "rgba(114, 248, 255, 0.1)",
                    color: brandCyan,
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  CONFIRMADO
                </Box>
              </Typography>
            </Box>

            <TextField
              label='NOMBRE COMPLETO (Nombre y Apellido)'
              fullWidth
              autoComplete='off'
              {...register("fullname", {
                required: "El nombre es obligatorio",
                pattern: {
                  value: nameRegex,
                  message: "Ingresa nombre y al menos un apellido",
                },
              })}
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              sx={inputStyles}
            />

            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='WHATSAPP'
                fullWidth
                autoComplete='off'
                placeholder='+521234567890'
                {...register("phone", {
                  required: "Teléfono obligatorio",
                  pattern: {
                    value: phoneRegex,
                    message: "Mín. 10 dígitos (solo números y +)",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={inputStyles}
              />
            </Grid>

            <TextField
              label='EMPRESA / ACADEMIA'
              fullWidth
              autoComplete='off'
              {...register("businessName", {
                required: "Este campo es obligatorio",
              })}
              error={!!errors.businessName}
              sx={inputStyles}
            />

            <TextField
              select
              label='PERFIL PROFESIONAL'
              fullWidth
              {...register("profile", { required: "Selecciona tu perfil" })}
              error={!!errors.profile}
              sx={inputStyles}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: "#064E57",
                      color: "#FFF",
                      borderRadius: 4,
                      "& .MuiMenuItem-root": {
                        "&:hover": { bgcolor: brandCyan, color: darkPetroleum },
                      },
                    },
                  },
                },
              }}
            >
              {visitorTypes.map((t) => (
                <MenuItem key={t} value={t} sx={{ borderRadius: 4 }}>
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
                          color: "rgba(255,255,255,0.3)",
                          "&.Mui-checked": { color: brandCyan },
                        }}
                      />
                    )}
                  />
                }
                label={
                  <Typography
                    variant='caption'
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Acepto la{" "}
                    <span
                      style={{
                        color: brandCyan,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenPolicy(true);
                      }}
                    >
                      Política de Privacidad
                    </span>{" "}
                    y los términos de la Expo.
                  </Typography>
                }
              />
              {errors.acceptTerms && (
                <Typography
                  variant='caption'
                  sx={{ color: "#ff4444", display: "block", ml: 4 }}
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
                py: 2.5,
                bgcolor: brandCyan,
                color: darkPetroleum,
                borderRadius: 4,
                fontWeight: 900,
                letterSpacing: "0.3em",
                boxShadow: `0 10px 30px rgba(114, 248, 255, 0.2)`,
                "&:hover": {
                  bgcolor: "#FFFFFF",
                  transform: isSubmitting ? "none" : "translateY(-3px)",
                },
                transition: "all 0.4s ease",
              }}
            >
              {isSubmitting ? (
                <Stack direction='row' spacing={2} alignItems='center'>
                  <CircularProgress size={20} sx={{ color: darkPetroleum }} />
                  <Typography sx={{ fontWeight: 900, fontSize: "0.9rem" }}>
                    REDIRECCIONANDO...
                  </Typography>
                </Stack>
              ) : (
                `PROCEDER AL PAGO • $${selectedPass.price} MXN`
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
