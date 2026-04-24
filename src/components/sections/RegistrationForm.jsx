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

  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  // -------------------------

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
          background: "#FFFFFF",
          borderRadius: 2,
          border: `1px solid rgba(255, 183, 206, 0.3)`,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(61, 43, 47, 0.05)",
        }}
      >
        {/* Línea decorativa superior en Rosa */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, transparent, ${brandPink}, transparent)`,
          }}
        />

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: brandPink,
            mb: 5,
            fontSize: "0.75rem",
            fontWeight: 800,
            borderRadius: 2,
            letterSpacing: "0.2em",
            "&:hover": {
              bgcolor: "rgba(255, 183, 206, 0.05)",
              color: deepText,
            },
          }}
        >
          CAMBIAR TIPO DE PASE
        </Button>

        <form onSubmit={handleSubmit(handleInternalSubmit)}>
          <Stack spacing={4}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  color: brandPink,
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
                  color: deepText,
                  borderBottom: `1px solid rgba(255, 183, 206, 0.2)`,
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
                    borderRadius: 2,
                    bgcolor: "rgba(255, 183, 206, 0.15)",
                    color: brandPink,
                    fontSize: "0.65rem",
                    fontWeight: 900,
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
                      bgcolor: "#FFFFFF",
                      color: deepText,
                      borderRadius: 1,
                      boxShadow: "0 10px 40px rgba(61, 43, 47, 0.15)",
                      "& .MuiMenuItem-root": {
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: "rgba(255, 183, 206, 0.15)",
                          color: brandPink,
                        },
                      },
                    },
                  },
                },
              }}
            >
              {visitorTypes.map((t) => (
                <MenuItem key={t} value={t} sx={{ borderRadius: 2, m: 0.5 }}>
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
                          color: "rgba(61, 43, 47, 0.2)",
                          "&.Mui-checked": { color: brandPink },
                        }}
                      />
                    )}
                  />
                }
                label={
                  <Typography
                    variant='caption'
                    sx={{ color: "rgba(61, 43, 47, 0.6)", fontWeight: 500 }}
                  >
                    Acepto la{" "}
                    <span
                      style={{
                        color: brandPink,
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontWeight: 700,
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
                  sx={{
                    color: "#d32f2f",
                    display: "block",
                    ml: 4,
                    fontWeight: 600,
                  }}
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
                bgcolor: deepText,
                color: "#FFFFFF",
                borderRadius: 2,
                fontWeight: 900,
                letterSpacing: "0.2em",
                boxShadow: `0 10px 30px rgba(61, 43, 47, 0.15)`,
                "&:hover": {
                  bgcolor: brandPink,
                  color: deepText,
                  transform: isSubmitting ? "none" : "translateY(-3px)",
                  boxShadow: `0 15px 40px rgba(255, 183, 206, 0.4)`,
                },
                transition: "all 0.4s ease",
              }}
            >
              {isSubmitting ? (
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                >
                  <CircularProgress size={20} sx={{ color: "#FFFFFF" }} />
                  <Typography sx={{ fontWeight: 900, fontSize: "0.9rem" }}>
                    PROCESANDO...
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
