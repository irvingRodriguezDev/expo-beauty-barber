import { Grid, Box, Typography, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { FormatCurrency } from "../../utils/FormatCurrency";

export const PassSelection = ({ options, onSelect }) => {
  // PALETA EDITORIAL & ELEGANTE
  const brandPink = "#ee6f97";
  const brandPinkDark = "#d6527c";
  const deepText = "#2A1E22";
  const softBg = "#FAF8F9";

  return (
    <motion.div
      key='selection'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Grid
        container
        spacing={3.5}
        justifyContent='center'
        alignItems='stretch'
      >
        {options.map((pass, index) => {
          // Destacar un pase como "Más Popular" o "Preventa" (ej. Pase de 2 Días o pase recomendado)
          const isFeatured =
            pass.isFeatured || pass.title.toLowerCase().includes("2 días");
          const isGroup = pass.title.toLowerCase().includes("grupal");

          return (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={pass.id || index}
              sx={{ display: "flex" }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: "100%", display: "flex" }}
              >
                <Box
                  onClick={() => onSelect(pass)}
                  sx={{
                    p: { xs: 3.5, md: 4 },
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: isFeatured ? "#FFFFFF" : softBg,
                    border: isFeatured
                      ? `2px solid ${brandPink}`
                      : "1px solid rgba(238, 111, 151, 0.2)",
                    borderRadius: "16px",
                    color: deepText,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: isFeatured
                      ? "0 20px 40px rgba(238, 111, 151, 0.15)"
                      : "0 10px 30px rgba(61, 43, 47, 0.04)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: brandPink,
                      boxShadow: "0 22px 45px rgba(238, 111, 151, 0.22)",
                      "& .cta-button": {
                        bgcolor: brandPinkDark,
                        transform: "scale(1.02)",
                      },
                      "& .icon-wrapper": {
                        bgcolor: `${brandPink}15`,
                        color: brandPink,
                        transform: "rotate(-8deg) scale(1.08)",
                      },
                    },
                  }}
                >
                  {/* Badge de Promoción / Destacado */}
                  {isFeatured && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                      }}
                    >
                      <Chip
                        icon={
                          <LocalOfferOutlinedIcon
                            sx={{ fontSize: "0.9rem !important" }}
                          />
                        }
                        label='RECOMENDADO'
                        size='small'
                        sx={{
                          bgcolor: brandPink,
                          color: "#FFF",
                          fontWeight: 800,
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          px: 0.5,
                        }}
                      />
                    </Box>
                  )}

                  {/* Header / Icono & Título */}
                  <Box sx={{ textTransform: "center" }}>
                    <Box
                      className='icon-wrapper'
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: isFeatured
                          ? `${brandPink}15`
                          : "rgba(61, 43, 47, 0.04)",
                        color: isFeatured ? brandPink : "rgba(61, 43, 47, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2.5,
                        transition:
                          "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                    >
                      <ConfirmationNumberOutlinedIcon sx={{ fontSize: 28 }} />
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "1.15rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                        mb: 1,
                      }}
                    >
                      {pass.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.825rem",
                        color: "rgba(42, 30, 34, 0.65)",
                        mb: 3,
                        lineHeight: 1.5,
                        fontWeight: 500,
                        minHeight: "3em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {pass.desc}
                    </Typography>
                  </Box>

                  {/* Precio / Preventa */}
                  <Box sx={{ my: 2, textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "baseline",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: "2.4rem", md: "2.8rem" },
                          color: deepText,
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {FormatCurrency(pass.price)}
                      </Typography>
                      <Typography
                        component='span'
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          opacity: 0.5,
                        }}
                      >
                        MXN
                      </Typography>
                    </Box>

                    {isGroup && (
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: brandPinkDark,
                          mt: 0.5,
                        }}
                      >
                        ($136 MXN por acceso)
                      </Typography>
                    )}
                  </Box>

                  {/* Beneficios Incluidos (Aumenta Percepción de Valor) */}
                  <Box
                    sx={{
                      borderTop: "1px dashed rgba(61, 43, 47, 0.12)",
                      pt: 2.5,
                      mb: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {(
                      pass.features || [
                        "Acceso a Zona Expo y Stands",
                        "Entrada a Masterclasses en Vivo",
                        "Constancia Digital de Asistencia",
                      ]
                    ).map((feat, idx) => (
                      <Box
                        key={idx}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CheckCircleOutlineRoundedIcon
                          sx={{ fontSize: 16, color: brandPink, flexShrink: 0 }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: "rgba(42, 30, 34, 0.8)",
                            textAlign: "left",
                          }}
                        >
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Botón Call To Action */}
                  <Button
                    className='cta-button'
                    fullWidth
                    variant={isFeatured ? "contained" : "outlined"}
                    sx={{
                      py: 1.2,
                      borderRadius: "12px",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      boxShadow: "none",
                      bgcolor: isFeatured ? brandPink : "transparent",
                      borderColor: brandPink,
                      color: isFeatured ? "#FFF" : brandPink,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: brandPinkDark,
                        borderColor: brandPinkDark,
                        color: "#FFF",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Seleccionar
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </motion.div>
  );
};
