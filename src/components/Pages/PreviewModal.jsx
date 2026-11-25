import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const PreviewModal = ({
  selectedPreview,
  BRAND_COLORS,
  setSelectedPreview,
}) => {
  return (
    <Dialog
      open={Boolean(selectedPreview)}
      onClose={() => setSelectedPreview(null)}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          border: `2px solid ${BRAND_COLORS.softPink}`,
        },
      }}
    >
      {selectedPreview && (
        <DialogContent sx={{ p: 0, position: "relative", bgcolor: "#FFFFFF" }}>
          <IconButton
            onClick={() => setSelectedPreview(null)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "#FFFFFF",
              color: BRAND_COLORS.primary,
              boxShadow: 2,
              "&:hover": { bgcolor: BRAND_COLORS.blushBg },
            }}
          >
            <Close />
          </IconButton>
          <Box
            component='img'
            src={selectedPreview.image}
            alt={selectedPreview.title}
            sx={{
              width: "100%",
              maxHeight: "75vh",
              objectFit: "contain",
              display: "block",
              bgcolor: BRAND_COLORS.blushBg,
            }}
          />
          <Box sx={{ p: 2.5 }}>
            <Typography
              variant='h6'
              sx={{ fontWeight: 700, color: BRAND_COLORS.primary }}
            >
              {selectedPreview.title}
            </Typography>
            <Typography variant='body2' sx={{ color: BRAND_COLORS.textMain }}>
              {selectedPreview.description}
            </Typography>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PreviewModal;
