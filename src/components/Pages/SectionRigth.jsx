import {
  AccessTime,
  AcUnit,
  CalendarMonth,
  CheckCircle,
  LocationOn,
  PersonOutline,
  PhoneIphone,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const SectionRigth = ({
  registeredUser,
  BRAND_COLORS,
  setRegisteredUser,
  handleChange,
  handleSubmit,
  formData,
  errors,
  loading,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          p: { xs: 3, sm: 4.5 },
          borderRadius: "24px",
          backgroundColor: "#FFFFFF",
          border: `2px solid ${BRAND_COLORS.softPink}`,
          boxShadow: "0 16px 40px rgba(229, 56, 136, 0.14)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Cinta decorativa superior dorada/rosa */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            borderTopLeftRadius: "22px",
            borderTopRightRadius: "22px",
            background: `linear-gradient(90deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.gold} 50%, ${BRAND_COLORS.primary} 100%)`,
          }}
        />

        {registeredUser ? (
          /* Vista de confirmación tras registro exitoso */
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircle
              sx={{ fontSize: 68, color: BRAND_COLORS.primary, mb: 1.5 }}
            />
            <Typography
              variant='h5'
              sx={{
                fontWeight: 800,
                color: BRAND_COLORS.textMain,
                mb: 1,
              }}
            >
              ¡Nos vemos en la Villa Navideña!
            </Typography>
            <Typography
              variant='body1'
              sx={{ color: BRAND_COLORS.textMuted, mb: 3 }}
            >
              Tu pase de acceso ha quedado registrado correctamente a nombre de:
            </Typography>

            <Box
              sx={{
                p: 2.5,
                borderRadius: "16px",
                backgroundColor: BRAND_COLORS.blushBg,
                border: `1.5px dashed ${BRAND_COLORS.primary}`,
                mb: 3,
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, color: BRAND_COLORS.primary }}
              >
                {registeredUser.fullName}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: BRAND_COLORS.textMain, mt: 0.5 }}
              >
                Tel: {registeredUser.phone}
              </Typography>
              <Chip
                label={`Folio: ${registeredUser.folio}`}
                sx={{
                  mt: 1.5,
                  backgroundColor: BRAND_COLORS.goldSoft,
                  border: `1px solid ${BRAND_COLORS.gold}`,
                  color: BRAND_COLORS.textMain,
                  fontWeight: 700,
                }}
              />
              <Typography
                variant='h5'
                sx={{
                  display: "block",
                  color: BRAND_COLORS.textMuted,
                  mt: 1,
                  fontWeight: "bold",
                }}
              >
                Piso 1 Sala Hermes, Expo Reforma.
              </Typography>
            </Box>

            <Button
              variant='outlined'
              onClick={() => setRegisteredUser(null)}
              sx={{
                borderRadius: "12px",
                borderColor: BRAND_COLORS.primary,
                color: BRAND_COLORS.primary,
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                "&:hover": {
                  borderColor: BRAND_COLORS.primaryDark,
                  backgroundColor: BRAND_COLORS.blushBg,
                },
              }}
            >
              Registrar a otra persona
            </Button>
          </Box>
        ) : (
          /* Formulario de Registro */
          <Box component='form' onSubmit={handleSubmit} noValidate>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 800,
                  color: BRAND_COLORS.primary,
                  mb: 0.8,
                }}
              >
                Villa Navideña
              </Typography>
              <Typography
                variant='h3'
                sx={{
                  fontWeight: 800,
                  color: BRAND_COLORS.textMain,
                  mb: 0.8,
                }}
              >
                ¡Asegura tu acceso!
              </Typography>
              <Typography
                variant='h5'
                component='h4'
                sx={{
                  fontWeight: 800,
                  color: BRAND_COLORS.primary,
                  lineHeight: 1.15,
                  mb: 1,
                }}
              >
                Christmas Nails • Expo Reforma
              </Typography>

              {/* Píldoras de información rápida */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent='center'
                alignItems='center'
                sx={{ mt: 2.5 }}
              >
                <Chip
                  icon={
                    <LocationOn
                      sx={{ color: `${BRAND_COLORS.primary} !important` }}
                    />
                  }
                  label='P1 Sala Hermes • 10 & 11 DIC'
                  sx={{
                    bgcolor: "#FFFFFF",
                    border: `1px solid ${BRAND_COLORS.softPink}`,
                    color: BRAND_COLORS.textMain,
                    fontWeight: 600,
                  }}
                />
                <Chip
                  icon={
                    <AccessTime
                      sx={{ color: `${BRAND_COLORS.primary} !important` }}
                    />
                  }
                  label='9:30 AM – 5:00 PM'
                  sx={{
                    bgcolor: "#FFFFFF",
                    border: `1px solid ${BRAND_COLORS.softPink}`,
                    color: BRAND_COLORS.textMain,
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </Box>

            <Divider
              sx={{
                mb: 3,
                borderColor: BRAND_COLORS.softPink,
                "&::before, &::after": {
                  borderColor: BRAND_COLORS.softPink,
                },
              }}
            >
              <AcUnit sx={{ color: BRAND_COLORS.primary, fontSize: 20 }} />
            </Divider>

            <Stack spacing={2.5}>
              <TextField
                fullWidth
                name='fullName'
                label='Nombre Completo'
                autoComplete='off'
                placeholder='Ej. Carolina Tavera'
                value={formData.fullName}
                onChange={handleChange}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                disabled={loading}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutline sx={{ color: BRAND_COLORS.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: BRAND_COLORS.blushBg,
                    "& fieldset": {
                      borderColor: BRAND_COLORS.softPink,
                    },
                    "&:hover fieldset": {
                      borderColor: BRAND_COLORS.primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: BRAND_COLORS.primary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: BRAND_COLORS.primary,
                  },
                }}
              />

              <TextField
                fullWidth
                name='phone'
                label='Teléfono (WhatsApp)'
                autoComplete='off'
                placeholder='10 dígitos (Ej. 5512345678)'
                value={formData.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                disabled={loading}
                required
                inputProps={{ inputMode: "numeric", maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIphone sx={{ color: BRAND_COLORS.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: BRAND_COLORS.blushBg,
                    "& fieldset": {
                      borderColor: BRAND_COLORS.softPink,
                    },
                    "&:hover fieldset": {
                      borderColor: BRAND_COLORS.primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: BRAND_COLORS.primary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: BRAND_COLORS.primary,
                  },
                }}
              />

              <Button
                type='submit'
                variant='contained'
                fullWidth
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.6,
                  borderRadius: "14px",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  textTransform: "none",
                  color: "#FFFFFF",
                  background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #F0529C 100%)`,
                  boxShadow: "0 8px 20px rgba(229, 56, 136, 0.35)",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primaryDark} 0%, ${BRAND_COLORS.primary} 100%)`,
                    boxShadow: "0 10px 24px rgba(229, 56, 136, 0.45)",
                    color: "#fff",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={26} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Registrarme a la Villa Navideña"
                )}
              </Button>
            </Stack>

            <Typography
              variant='caption'
              sx={{
                display: "block",
                textAlign: "center",
                color: BRAND_COLORS.textMuted,
                mt: 2.5,
              }}
            >
              El registro a la villa navideña, no incluye acceso a las clases.
            </Typography>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default SectionRigth;
