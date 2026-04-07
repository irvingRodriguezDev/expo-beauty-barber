import { Grid, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const PassSelection = ({ options, onSelect }) => (
  <motion.div
    key='selection'
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
  >
    <Grid container spacing={3} justifyContent='center'>
      {options.map((pass) => (
        <Grid item xs={12} sm={6} key={pass.id}>
          <Box
            onClick={() => onSelect(pass)}
            sx={{
              p: 5,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              textAlign: "center",
              cursor: "pointer",
              transition: "0.4s",
              borderRadius: 0,
              color: "#FFF",
              "&:hover": {
                bgcolor: "#D4AF37",
                color: "#062C22",
                transform: "translateY(-10px)",
                "& .price": { color: "#062C22" },
                "& .icon": { color: "#062C22" },
              },
            }}
          >
            <ConfirmationNumberIcon
              className='icon'
              sx={{ fontSize: 40, mb: 2, color: "#D4AF37" }}
            />
            <Typography
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 800,
                fontSize: "1.2rem",
                mb: 1,
                letterSpacing: "0.1em",
              }}
            >
              {pass.title}
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", opacity: 0.7, mb: 3 }}>
              {pass.desc}
            </Typography>
            <Typography
              className='price'
              sx={{
                fontFamily: "'Syne'",
                fontWeight: 900,
                fontSize: "2.5rem",
                color: "#D4AF37",
              }}
            >
              ${pass.price} <small style={{ fontSize: "1rem" }}>MXN</small>
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </motion.div>
);
