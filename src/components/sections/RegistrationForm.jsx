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
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm();

  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

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
          // Fondo de cristal oscuro
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          border: `1px solid rgba(114, 248, 255, 0.1)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Línea de acento superior estilo terminal */}
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
            "&:hover": { bgcolor: "transparent", color: "#FFF", pl: 0 },
          }}
        >
          CAMBIAR TIPO DE PASE
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              label='NOMBRE COMPLETO'
              fullWidth
              variant='outlined'
              autoComplete='off'
              name='fullname'
              {...register("fullname", { required: true })}
              error={!!errors.fullname}
              sx={inputStyles}
            />

            <Grid item xs={12} sm={6}>
              <TextField
                label='EMAIL'
                fullWidth
                autoComplete='off'
                {...register("email", { required: true })}
                error={!!errors.email}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Empresa, Escuela, Academia, etc. '
                fullWidth
                type='text'
                autoComplete='off'
                {...register("businessName", { required: true })}
                error={!!errors.businessName}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='WHATSAPP'
                fullWidth
                name='phone'
                autoComplete='off'
                {...register("phone", { required: true })}
                error={!!errors.phone}
                sx={inputStyles}
              />
            </Grid>

            <TextField
              select
              label='PERFIL PROFESIONAL'
              fullWidth
              {...register("profile", { required: true })}
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
                        fontSize: "0.9rem",
                        "&:hover": { bgcolor: brandCyan, color: darkPetroleum },
                      },
                    },
                  },
                },
              }}
            >
              {visitorTypes.map((t) => (
                <MenuItem key={t} value={t} sx={{ borderRadius: 4 }}>
                  {t.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={isSubmitting} // Bloquea el botón mientras carga
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
                    REDIRECCIONANDO AL PAGO...
                  </Typography>
                </Stack>
              ) : (
                `PROCEDER AL PAGO • $${selectedPass.price} MXN`
              )}
            </Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
};
