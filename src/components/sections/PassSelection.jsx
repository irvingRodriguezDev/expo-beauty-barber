import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const PassSelection = ({ options, onSelect }) => {
  // --- PALETA COHERENTE ---
  const brandPink = "#ee6f97ff"; // Rosa pastel claro
  const deepText = "#3D2B2F"; // Texto oscuro cálido
  // -------------------------

  return (
    <motion.div
      key='selection'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Grid container spacing={3} justifyContent='center'>
        {options.map((pass) => (
          <Grid item xs={12} sm={6} lg={3} key={pass.id}>
            <Box
              onClick={() => onSelect(pass)}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: "#FFFFFF",
                border: `1px solid rgba(255, 183, 206, 0.3)`,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                borderRadius: 1,
                color: deepText,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(61, 43, 47, 0.03)",
                "&:hover": {
                  borderColor: brandPink,
                  transform: "translateY(-10px)",
                  boxShadow: `0 20px 40px rgba(61, 43, 47, 0.08)`,
                  "& .price": { color: brandPink },
                  "& .icon": {
                    transform: "scale(1.1) rotate(-5deg)",
                    color: brandPink,
                  },
                  "& .select-text": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              {/* Decoración sutil de fondo al hover */}
              <Box
                className='hover-bg'
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `radial-gradient(circle at center, rgba(255, 183, 206, 0.1) 0%, transparent 70%)`,
                  opacity: 0,
                  transition: "0.4s",
                  pointerEvents: "none",
                  ".MuiBox-root:hover &": { opacity: 1 },
                }}
              />

              <ConfirmationNumberIcon
                className='icon'
                sx={{
                  fontSize: 50,
                  mb: 2,
                  color: "rgba(255, 183, 206, 0.8)",
                  transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  mb: 1,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {pass.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "rgba(61, 43, 47, 0.6)",
                  mb: 4,
                  lineHeight: 1.5,
                  fontWeight: 500,
                  minHeight: "4.5em", // Mantiene alineados los precios
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {pass.desc}
              </Typography>

              <Typography
                className='price'
                sx={{
                  fontWeight: 900,
                  fontSize: "2.8rem",
                  color: deepText,
                  transition: "0.3s",
                  mb: 1,
                }}
              >
                ${pass.price}
                <Box
                  component='span'
                  sx={{ fontSize: "0.9rem", opacity: 0.5, ml: 1 }}
                >
                  MXN
                </Box>
              </Typography>

              <Typography
                className='select-text'
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.3em",
                  color: brandPink,
                  opacity: 0,
                  transform: "translateY(10px)",
                  transition: "0.3s",
                  textTransform: "uppercase",
                }}
              >
                Clic para seleccionar
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};
