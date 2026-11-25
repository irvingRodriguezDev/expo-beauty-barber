import { Storefront, ZoomIn } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const SectionLeft = ({
  REFERENCE_GALLERY,
  setSelectedPreview,
  BRAND_COLORS,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <Stack spacing={2.5} sx={{ height: "100%" }}>
        {REFERENCE_GALLERY.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelectedPreview(item)}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              cursor: "pointer",
              border: `2px solid ${BRAND_COLORS.softPink}`,
              boxShadow: "0 10px 28px rgba(229, 56, 136, 0.12)",
              backgroundColor: "#FFFFFF",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 14px 34px rgba(229, 56, 136, 0.22)",
                borderColor: BRAND_COLORS.primary,
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component='img'
                height='210'
                image={item.image}
                alt={item.title}
                sx={{ objectFit: "cover" }}
              />
              <Chip
                size='small'
                icon={
                  <Storefront
                    sx={{ color: "#FFFFFF !important", fontSize: 16 }}
                  />
                }
                label={item.badge}
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: BRAND_COLORS.primary,
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  bgcolor: "rgba(255,255,255,0.92)",
                  borderRadius: "50%",
                  p: 0.7,
                  display: "flex",
                  color: BRAND_COLORS.primary,
                }}
              >
                <ZoomIn fontSize='small' />
              </Box>
            </Box>

            <CardContent sx={{ py: 2, px: 2.5 }}>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: 700, color: BRAND_COLORS.textMain }}
              >
                {item.title}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: BRAND_COLORS.textMuted, mt: 0.3 }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Grid>
  );
};

export default SectionLeft;
