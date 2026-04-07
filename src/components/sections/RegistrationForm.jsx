import {
  Paper,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Grid,
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
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <motion.div
      key='form'
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: { xs: 4, md: 6 },
          background: "#FFFFFF",
          borderRadius: 0,
          border: "1px solid #D4AF37",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: "#062C22",
            mb: 4,
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.1em",
          }}
        >
          CAMBIAR TIPO DE PASE
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Typography
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "#D4AF37",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                pb: 1,
                letterSpacing: "0.2em",
              }}
            >
              DATOS DEL ASISTENTE • {selectedPass.title}
            </Typography>

            <TextField
              label='NOMBRE COMPLETO'
              fullWidth
              {...register("nombre", { required: true })}
              error={!!errors.nombre}
              sx={inputStyles}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='EMAIL'
                  fullWidth
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='WHATSAPP'
                  fullWidth
                  {...register("telefono", { required: true })}
                  error={!!errors.telefono}
                  sx={inputStyles}
                />
              </Grid>
            </Grid>

            <TextField
              select
              label='PERFIL PROFESIONAL'
              fullWidth
              {...register("tipo", { required: true })}
              error={!!errors.tipo}
              sx={inputStyles}
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
              fullWidth
              sx={{
                py: 2,
                bgcolor: "#062C22",
                color: "#fff",
                borderRadius: 0,
                fontWeight: 800,
                fontFamily: "'Syne'",
                letterSpacing: "0.2em",
                "&:hover": { bgcolor: "#D4AF37", color: "#062C22" },
              }}
            >
              CONFIRMAR REGISTRO (${selectedPass.price} MXN)
            </Button>
          </Stack>
        </form>
      </Paper>
    </motion.div>
  );
};
