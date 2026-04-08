import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const PassSelection = ({ options, onSelect }) => {
  const brandCyan = "#72F8FF";
  const darkPetroleum = "#02181B";

  return (
    <motion.div
      key='selection'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Grid container spacing={3} justifyContent='center'>
        {options.map((pass) => (
          <Grid item xs={12} sm={6} key={pass.id}>
            <Box
              onClick={() => onSelect(pass)}
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(114, 248, 255, 0.1)",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                borderRadius: 0,
                color: "#FFF",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  bgcolor: "rgba(114, 248, 255, 0.05)",
                  borderColor: brandCyan,
                  transform: "translateY(-10px)",
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(114, 248, 255, 0.1)`,
                  "& .price": { color: brandCyan },
                  "& .icon": {
                    color: "#FFF",
                    transform: "scale(1.1) rotate(5deg)",
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
                  background: `radial-gradient(circle at center, rgba(114, 248, 255, 0.1) 0%, transparent 70%)`,
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
                  color: brandCyan,
                  transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              />

              <Typography
                sx={{
                  // fontFamily: "'Syne'",
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  mb: 1,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {pass.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.5)",
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {pass.desc}
              </Typography>

              <Typography
                className='price'
                sx={{
                  // fontFamily: "'Syne'",
                  fontWeight: 900,
                  fontSize: "3rem",
                  color: "#FFF",
                  transition: "0.3s",
                  mb: 2,
                }}
              >
                ${pass.price}{" "}
                <small style={{ fontSize: "1rem", opacity: 0.5 }}>MXN</small>
              </Typography>

              <Typography
                className='select-text'
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.3em",
                  color: brandCyan,
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
